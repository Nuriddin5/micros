using System.Collections.Immutable;
using System.Globalization;
using MicrosApi.Dtos;
using MicrosApi.Exception;
using Microsoft.EntityFrameworkCore;
using MicrosApi.Context;
using MicrosApi.Models;

namespace MicrosApi.Services;

public class TransactionService : ITransactionService
{
    private readonly ApiDbContext _context;

    public TransactionService(ApiDbContext context)
    {
        _context = context;
    }


    public List<Transaction> GetTransactionsByUser(string username)
    {
        List<Transaction> transactions;
        try
        {
            var user = UserChecking(username);

            _context.transaction.Find(1);
            transactions = new List<Transaction>(_context.transaction.Where(transaction => transaction.Category != null)
                .ToImmutableList());
        }
        catch (System.Exception e)
        {
            throw new CustomException(e.Message);
        }

        return transactions;
    }


    public Transaction AddTransaction(TransactionDto transactionDto, string username)
    {
        var user = UserChecking(username);


        if (string.IsNullOrEmpty(transactionDto.Date!.ToString(CultureInfo.InvariantCulture)))
        {
            throw new CustomException("Transaction date can't be empty!");
        }

        if (string.IsNullOrEmpty(transactionDto.CategoryName))
        {
            throw new CustomException("Transaction category name can't be empty!");
        }

        if (string.IsNullOrEmpty(transactionDto.Amount.ToString()) || transactionDto.Amount < 0)
        {
            throw new CustomException("Transaction amount can be real!");
        }

        var category = _context.category.FirstOrDefault(category =>
            category.Name!.Equals(transactionDto.CategoryName) && category.UserId == user.Id);

        if (category == null)
        {
            throw new CustomException("Transaction category is wrong!");
        }

        if (category.IsIncome != transactionDto.IsIncome)
        {
            throw new CustomException("Category is only for income(or expense)!");
        }


        Transaction transaction = new()
        {
            Amount = transactionDto.Amount,
            Date = Convert.ToDateTime(transactionDto.Date),
            Category = category,
            IsIncome = transactionDto.IsIncome,
            User = user,
            Comment = transactionDto.Comment
        };
        _context.transaction.Add(transaction);
        _context.SaveChanges();

        return transaction;
    }

    public void DeleteTransaction(int transactionId, string username)
    {
        var user = UserChecking(username);

        TransactionValidChecking(transactionId, user, out var transaction);

        _context.transaction.Remove(transaction!);
        _context.SaveChanges();
    }


    public void EditTransaction(int transactionId, TransactionDto transactionDto, string username)
    {
        var user = UserChecking(username);


        if (string.IsNullOrEmpty(transactionDto.Date!.ToString(CultureInfo.InvariantCulture)))
        {
            throw new CustomException("Transaction date can't be empty!");
        }

        if (string.IsNullOrEmpty(transactionDto.CategoryName))
        {
            throw new CustomException("Transaction category name can't be empty!");
        }

        if (string.IsNullOrEmpty(transactionDto.Amount.ToString()) || transactionDto.Amount < 0)
        {
            throw new CustomException("Transaction amount can be real!");
        }

        var category = _context.category.FirstOrDefault(category =>
            category.Name!.Equals(transactionDto.CategoryName) && category.UserId == user.Id);

        if (category == null)
        {
            throw new CustomException("Transaction category is wrong!");
        }

        if (category.IsIncome != transactionDto.IsIncome)
        {
            throw new CustomException("Category's for income(or expense)!");
        }


        TransactionValidChecking(transactionId, user, out var transaction);

        if (transaction!.Date.ToString().Equals(transactionDto.Date)
            && transaction.IsIncome == transactionDto.IsIncome
            && transaction.Amount == transactionDto.Amount
            && transaction.Comment!.Equals(transactionDto.Comment))
        {
            throw new CustomException("You should edit or back!");
        }

        transaction.Date = Convert.ToDateTime(transactionDto.Date);
        transaction.IsIncome = transactionDto.IsIncome;
        transaction.Amount = transactionDto.Amount;
        transaction.Comment = transactionDto.Comment;

        _context.Entry(transaction).State = EntityState.Modified;

        _context.SaveChanges();
    }


    private void TransactionValidChecking(int transactionId, User? user, out Transaction? transaction)
    {
        transaction = _context.transaction.Find(transactionId);
        if (transaction == null || transaction.User!.Id != user!.Id)
        {
            throw new CustomException("Problem with account");
        }
    }

    private User UserChecking(string username)
    {
        var user = _context.user.FirstOrDefault(user => username.Equals(user.UserName));
        if (user == null)
        {
            throw new CustomException("Uncaught error");
        }

        return user;
    }
}