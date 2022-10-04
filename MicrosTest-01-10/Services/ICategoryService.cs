using MicrosTest_01_10.Dtos;
using MicrosTest_01_10.Models;

namespace MicrosTest_01_10.Services;

public interface ICategoryService
{
    List<Category> GetCategoriesByUser(string username);
    Category AddCategory(CategoryDto categoryDto, string username);
    void DeleteCategory(int categoryId, string username);
    void EditCategory(int categoryId,CategoryDto categoryDto, string username);
}