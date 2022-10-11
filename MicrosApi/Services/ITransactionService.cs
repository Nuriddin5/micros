using MicrosApi.Dtos;
using MicrosApi.Models;

namespace MicrosApi.Services;

public interface ITransactionService
{
    List<Transaction> GetTransactionsByUser(string username,string? type,string? category);
    Transaction AddTransaction(TransactionDto transactionDto, string username);
    void DeleteTransaction(int transactionId, string username);
    void EditTransaction(int transactionId,TransactionDto transactionDto, string username);
}