using MicrosApi.Context;
using MicrosApi.Dtos;
using MicrosApi.Models;
using MicrosApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MicrosApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly ITransactionService _service;

        public TransactionsController(ApiDbContext context, ITransactionService service)
        {
            _context = context;
            _service = service;
        }


        // GET: api/Transactions/user
        [Authorize]
        [HttpGet("User")]
        public ActionResult<List<Transaction>> GetTransactionsByUser()
        {
            List<Transaction> transactions;
            try
            {
                var username = HttpContext.User.Identity?.Name;
                transactions = _service.GetTransactionsByUser(username);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(transactions);
        }

        // PUT: api/Transactions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaction(int id, TransactionDto transactionDto)
        {
            try
            {
                var username = HttpContext.User.Identity?.Name;
                _service.EditTransaction(id, transactionDto, username);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok("Successfully edited");
        }

        // POST: api/Transactions
        [HttpPost]
        public ActionResult<Transaction> PostTransaction(TransactionDto transactionDto)
        {
            Transaction transaction;
            try
            {
                var username = HttpContext.User.Identity?.Name;
                transaction = _service.AddTransaction(transactionDto, username);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(transaction);
        }

        // DELETE: api/Transactions/5
        [HttpDelete("{id}")]
        public IActionResult DeleteTransaction(int id)
        {
            try
            {
                var username = HttpContext.User.Identity?.Name;
                _service.DeleteTransaction(id, username);
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }

            return NoContent();
        }
    }
}