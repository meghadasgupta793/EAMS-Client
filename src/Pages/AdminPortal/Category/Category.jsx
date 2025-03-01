import React, { useState } from 'react';
import './Category.css';
import Header from '../../../Components/Header/Header';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { exportToExcel } from '../../../Components/Utils/excelUtils';
import { useNavigate } from 'react-router-dom';
import { useGetAllCategoryQuery, useDeleteCategoryMutation } from '../../../Redux/api/admin/categoryApi';

const ITEMS_PER_PAGE = 7;

const Category = () => {
    const { data, error, isLoading } = useGetAllCategoryQuery();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [searchQueries, setSearchQueries] = useState({
        categoryCode: '',
        categoryName: '',
    });
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const categories = data?.data || [];

    const filteredData = categories.filter(item =>
        item?.Code?.toLowerCase().includes(searchQueries.categoryCode.toLowerCase()) &&
        item?.Name?.toLowerCase().includes(searchQueries.categoryName.toLowerCase())
    );

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handleNext = () => setPage(prev => prev + 1);
    const handlePrevious = () => setPage(prev => prev - 1);
    const handleExport = () => exportToExcel(filteredData, 'CategoryDetails');

    const goToCreateCategory = () => navigate('/newCategory');
    const goToUpdateCategory = (categoryId) => navigate(`/updateCategory/${categoryId}`);

    const handleSearchChange = (e, field) => {
        setSearchQueries(prevQueries => ({
            ...prevQueries,
            [field]: e.target.value
        }));
    };

    const handleDelete = async (categoryId) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            await deleteCategory(categoryId).unwrap();
            alert('Category deleted successfully');
        } catch (err) {
            console.error('Failed to delete category:', err);
            alert('Failed to delete category. Please try again.');
        }
    };

    return (
        <div className='category'>
            <Header />
            <div className='category-table-container'>
                <div className='category-header-container'>
                    <h1 className='category-heading'>Category List</h1>
                    <div className='category-icon-container'>
                        <Tooltip title="Search">
                            <IconButton>
                                <SearchIcon className='category-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Export Categories">
                            <IconButton onClick={handleExport}>
                                <FileDownloadIcon className='category-header-icon' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Create New Category">
                            <IconButton onClick={goToCreateCategory}>
                                <AddCircleOutlineIcon className='category-header-icon' />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                {isLoading && <p>Loading categories...</p>}
                {error && <p>Error loading categories: {error.message}</p>}

                <table className='category-table'>
                    <thead>
                        <tr>
                            <th>Category Code</th>
                            <th>Category Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item) => (
                            <tr key={item.ID}>
                                <td>{item.Code}</td>
                                <td>{item.Name}</td>
                                <td>
                                    <BorderColorIcon className='action-btn update-btn' onClick={() => goToUpdateCategory(item.ID)} />
                                    <DeleteForeverIcon className='action-btn delete-btn' onClick={() => handleDelete(item.ID)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='pagination-container'>
                    {page > 1 && (
                        <IconButton onClick={handlePrevious}>
                            <KeyboardDoubleArrowLeftIcon className='pagination-btn' />
                        </IconButton>
                    )}
                    <span>{page}</span>
                    {endIndex < filteredData.length && (
                        <IconButton onClick={handleNext}>
                            <KeyboardDoubleArrowRightIcon className='pagination-btn' />
                        </IconButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Category;
