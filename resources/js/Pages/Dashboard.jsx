import Addtaskform from '@/Components/Addtaskform';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { use, useEffect } from 'react';


export default function Dashboard({ auth , users } ) {
    const roles = auth.user.roles.map(role => role.name);
    const isAdmin = roles.includes('admin');
    
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            {isAdmin && 
                <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h2 className='text-2xl font-bold text-gray-900'>Admin Dashboard</h2>
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>  
            }
            {/* <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
            <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Addtaskform users={users}/>
            </div> */}
        {/* </div> */}
        </AuthenticatedLayout>
    );
}
