using System.Globalization;
using MicrosApi.Context;
using MicrosApi.Dtos;
using MicrosApi.Exception;
using MicrosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MicrosApi.Services;

public class TransactionService : ITransactionService
{
    private readonly ApiDbContext _context;

    public TransactionService(ApiDbContext context)
    {
        _context = context;
    }


    public List<Transaction> GetTransactionsByUser(string username,string? type,string? category)
    {
        List<Transaction> transactions;
        try
        {
            var user = UserChecking(username);
            //todo in both not null
            transactions = _context.transactions.Include(t => t.Category!.Type).Include(t => t.Category)
                .Where(transaction =>
                    (string.IsNullOrEmpty(type) && string.IsNullOrEmpty(category)) ?
                        transaction.User!.Id == user.Id :
                            !string.IsNullOrEmpty(type) ?
                            transaction.User!.Id == user.Id && transaction.Category!.Type!.Name!.Equals(type) :
                            transaction.User!.Id == user.Id && transaction.Category!.Name!.Equals(category)
                    ).ToList();
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

        var category = _context.categories.FirstOrDefault(category =>
            category.Name!.Equals(transactionDto.CategoryName) && category.User!.Id == user.Id);

        if (category == null)
        {
            throw new CustomException("Transaction category is wrong!");
        }

        Transaction transaction = new()
        {
            Amount = transactionDto.Amount,
            Date = Convert.ToDateTime(transactionDto.Date),
            Category = category,
            User = user,
            Comment = transactionDto.Comment
        };
        _context.transactions.Add(transaction);
        _context.SaveChanges();

        return transaction;
    }

    public void DeleteTransaction(int transactionId, string username)
    {
        var user = UserChecking(username);

        TransactionValidChecking(transactionId, user, out var transaction);

        _context.transactions.Remove(transaction!);
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

        var category = _context.categories.FirstOrDefault(category =>
            category.Name!.Equals(transactionDto.CategoryName) && category.User!.Id == user.Id);

        if (category == null)
        {
            throw new CustomException("Transaction category is wrong!");
        }


        TransactionValidChecking(transactionId, user, out var transaction);

        if (transaction!.Date.CompareTo(Convert.ToDateTime(transactionDto.Date)) == 0
            && transaction.Amount == transactionDto.Amount
            && transaction.Comment!.Equals(transactionDto.Comment)
            && transactionDto.CategoryName.Equals(transaction.Category.Name))
        {
            throw new CustomException("You should edit or back!");
        }

        transaction.Date = Convert.ToDateTime(transactionDto.Date);
        transaction.Category = category;
        transaction.Amount = transactionDto.Amount;
        transaction.Comment = transactionDto.Comment;

        _context.Entry(transaction).State = EntityState.Modified;

        _context.SaveChanges();
    }


    private void TransactionValidChecking(int transactionId, User? user, out Transaction? transaction)
    {
        transaction = _context.transactions.Include(t => t.Category).First(t=>t.Id == transactionId);
        if (transaction == null || transaction.User!.Id != user!.Id)
        {
            throw new CustomException("Problem with account");
        }
    }

    private User UserChecking(string username)
    {
        var user = _context.users.FirstOrDefault(user => username.Equals(user.UserName));
        if (user == null)
        {
            throw new CustomException("Uncaught error");
        }

        return user;
    }
}