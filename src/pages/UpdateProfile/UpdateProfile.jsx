import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import axios from 'axios'; // API কলের জন্য

const UpdateProfile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUploading(true);

        const form = e.target;
        const name = form.name.value;
        const imageFile = form.image.files[0]; // ১. ইউজার যে ফাইলটি সিলেক্ট করেছে, সেটি এখানে পাওয়া যায়

        let photoURL = user.photoURL;

        // ২. যদি ইউজার নতুন কোনো ছবি সিলেক্ট করে থাকে
        if (imageFile) {
            if (imageFile.size > 300 * 1024) {
                toast.error('Image size should be less than 300KB.');
                setUploading(false);
                return;
            }

            const formData = new FormData();
            formData.append('image', imageFile);

            try {
                // ৩. ছবিটি ImgBB-তে আপলোড করা হচ্ছে
                const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
                
                if (response.data.success) {
                    // ৪. ImgBB থেকে পাওয়া নতুন URL-টি photoURL ভ্যারিয়েবলে সেভ করা হচ্ছে
                    photoURL = response.data.data.display_url;
                } else {
                    throw new Error('Image upload failed.');
                }
            } catch (error) {
                toast.error('Failed to upload image.');
                setUploading(false);
                return;
            }
        }

        // ৫. সবশেষে, নাম এবং নতুন ছবির URL দিয়ে Firebase প্রোফাইল আপডেট করা হচ্ছে
        try {
            await updateUserProfile(name, photoURL);
            toast.success('Profile updated successfully!');
            navigate('/my-profile');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container mx-auto my-12 p-4">
            <Helmet>
                <title>GameHub | Update Profile</title>
            </Helmet>

            <div className="max-w-md mx-auto bg-base-200 shadow-xl rounded-lg p-8 border border-primary">
                <h1 className="text-3xl font-bold text-center mb-6 font-orbitron">Update Your Profile</h1>
                <form onSubmit={handleUpdate}>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Full Name</span></label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={user?.displayName}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    
                    {/* এই ইনপুটটি ইউজারকে ফাইল আপলোড করার অপশন দেয় */}
                    <div className="form-control mt-4">
                        <label className="label"><span className="label-text">Change Profile Photo (Max 300KB)</span></label>
                        <input
                            type="file"
                            name="image"
                            className="file-input file-input-bordered file-input-primary w-full"
                            accept="image/*"
                        />
                    </div>

                    <div className="form-control mt-8">
                        <button type="submit" className="btn btn-primary font-orbitron" disabled={uploading}>
                            {uploading ? <span className="loading loading-spinner"></span> : 'Update Information'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;