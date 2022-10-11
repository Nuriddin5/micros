using MicrosApi.Dtos;
using MicrosApi.Models;

namespace MicrosApi.Services;

public interface ITransactionService
{
    List<Transaction> GetTransactionsByUser(string username,string? type,string? category ,string? startDate,string? endDate);
    Transaction AddTransaction(TransactionDto transactionDto, string username);
    void DeleteTransaction(int transactionId, string username);
    void EditTransaction(int transactionId,TransactionDto transactionDto, string username);
}