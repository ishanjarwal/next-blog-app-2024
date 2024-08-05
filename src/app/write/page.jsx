"use client"
import React, { useEffect, useState } from 'react'
import styles from './write.module.css'
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import { LuImagePlus } from "react-icons/lu";
import imagePreview from '@/utils/imagePreview';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { slugify } from '@/utils/slugify';
import dynamic from 'next/dynamic';
import { upload } from '@/utils/upload';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/utils/firebase';

const storage = getStorage(app);

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const sendData = async (data) => {
    try {
        const res = await axios.post('http://localhost:3000/api/posts', data);
        if (res.status != 200) {
            return { redirect: "/error" };
        }
        return { redirect: `/blogs/${res.data.slug}` };
    } catch (error) {
        console.log(error.message);
        return { redirect: "/error" };
    }
}

const Page = () => {
    const router = useRouter();

    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);
    const [data, setData] = useState({
        title: "",
        slug: "",
        desc: "",
        img: "",
        catSlug: ""
    })


    const handleSet = (name, value) => {
        setData(prev => ({ ...prev, [name]: value }));
    }

    const toolbar_options = [
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction


        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        // [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ]

    const handleSubmit = async () => {
        const { redirect } = await sendData(data);
        router.push(redirect);
    }

    useEffect(() => {
        if (file) {
            imagePreview(file).then(val => {
                setUrl(val);
            })
        }
    }, [file]);

    useEffect(() => {
        function uploadThumbnail() {
            const fileName = (new Date()).getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(err?.message)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log("The image download url is : ", downloadURL);
                        setData(prev => ({ ...prev, img: downloadURL }))
                    });
                }
            );
        }
        file && uploadThumbnail();
    }, [file]);

    return (
        <div className={styles.container}>
            <textarea
                className={styles.title}
                placeholder='Title'
                name="title"
                id="title"
                value={data.title}
                onChange={(e) => {
                    handleSet("title", e.target.value);
                    handleSet("slug", slugify(e.target.value));
                }}
            />

            <select
                className={styles.categoryInput}
                name="category"
                id="category"
                onChange={(e) => {
                    handleSet("catSlug", e.target.value)
                }}
            >
                <option value="" disabled selected hidden>Select a Category</option>
                <option value="fashion">fashion</option>
                <option value="coding">coding</option>
                <option value="asdf">culture</option>
            </select>

            <div className={styles.imgInput}>
                <label htmlFor="img">
                    {
                        file
                            ?
                            <div className={styles.imgContainer}>
                                <Image
                                    src={url}
                                    fill
                                />
                            </div>
                            :
                            <>
                                <LuImagePlus style={{ fontSize: "64px", color: "var(--text)" }} />
                                <p>Choose a Thumbnail Image for this Blog</p>
                            </>
                    }
                </label>
                <input
                    type="file"
                    name="img"
                    id="img"
                    accept='image/jpeg'
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                />
            </div>

            <ReactQuill theme="snow" value={data.desc} onChange={(v) => {
                handleSet("desc", v)
            }} modules={{ toolbar: toolbar_options }} />

            <div className={styles.tags}>
                <label htmlFor="tags">Tags for Discoverability (comma seperated)</label>
                <textarea
                    name="tags"
                    id="tags"
                    value={data.tags}
                    onChange={(e) => {
                        handleSet("tags", e.target.value)
                    }}
                />
            </div>

            <div className={styles.bottom}>
                <button onClick={handleSubmit}>Publish</button>
            </div>
        </div>
    )
}

export default Page
