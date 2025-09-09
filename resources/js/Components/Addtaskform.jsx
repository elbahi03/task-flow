import { useState } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';

const Addtaskform = () => {
    
    const [values, setValues] = useState({
        title: '',
        description: '',
        status: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('values', values);
        
        axios.post('/tasks', values, {
            onSuccess: () => {
                // Reset form after successful submission
                setValues({
                    title: '',
                    description: '',
                    status: 'todo',
                });
            },
            onError: (errors) => {
                setErrors(errors);
            },
        }).then((response) => {
            console.log(response);
            
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={values.title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.title && (
                        <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={values.description}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.description && (
                        <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="status"
                        value={values.status}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value=""></option>
                        <option value="todo">todo</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">done</option>
                    </select>
                    {errors.status && (
                        <div className="text-red-500 text-sm mt-1">{errors.status}</div>
                    )}
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Addtaskform;