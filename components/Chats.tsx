import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios'

const fetcher = (url, data) => {
    if (data) {
        return axios.post(url, data).then(res => res.data);
    } else {
        return axios.get(url).then(res => res.data);
    }
};

const Chats = () => {
    var res = []

    const getChats = async () => {
        res = await fetcher(`/api/getchats`, false);
    }

    useEffect(() => {
        getChats
    }, [])

    return (
        <div>
            {res}
        </div>
    )
}
export default Chats