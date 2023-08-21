import React, { useState } from 'react';
import Layout from "../components/Layout"
import User, { UserProps } from "../components/User"
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url, data) => {
  if (data) {
    return axios.post(url, data).then(res => res.data);
  } else {
    return axios.get(url).then(res => res.data);
  }
};

const TeamTether = () => {

  return (<form>
  </form>
  )
}

export default TeamTether
