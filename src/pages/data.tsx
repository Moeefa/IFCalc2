import Link from 'next/link';
import Carousel from '../components/Carousel';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie, hasCookie, getCookie } from 'cookies-next';
import { IconTrash } from '@tabler/icons';
import { IYear, IBim, IOpenState } from '../interfaces';
import { IUsers } from '../utils/schemas/Users';
import {
  NumberInput,
  ActionIcon,
  TextInput,
  AppShell,
  Skeleton,
  Divider,
  Button,
  Group,
  Modal,
  Tabs,
  Text,
  Box,
} from '@mantine/core';

const Page = () => {
  const router = useRouter();
  
  const [data, setData] = useState<IUsers | "loading" | "failed">("loading");
  const [year, setYear] = useState<IYear>({ nome: '', '1': 0, '2': 0, '3': 0, '4': 0, avg: 0 });
  const [bim, setBim] = useState<IBim>({ nome: '', bimestre: 1, nota: 0, conceito: 0, avg: 0 });
  const [opened, setOpened] = useState<IOpenState | undefined>({ type: -1 });

  useEffect(() => {
    if (!window.location.hash) return;
    let urlParams = new URLSearchParams(window.location.hash.slice(1));
    if (!hasCookie("suapObj") && urlParams.get('access_token')) setCookie("suapObj", JSON.stringify({ message: "Não mostre o seu token a ninguém! Ele dá acesso tanto a sua conta do SUAP quanto do IFCalc.", token: urlParams.get('access_token') }), { maxAge: Number(urlParams.get('expires_in')) });
    
    router.push('/', undefined, { shallow: true });
  }, []);

  useEffect(() => {
    if (!hasCookie("suapObj")) return;
    axios
      .get('/api/user', { params: { token: JSON.parse(getCookie("suapObj").toString()).token } })
      .then((res) => setData(res.data.data))
      .catch(() => setData("failed"));
  }, []);

  return (
    <>
      {hasCookie("suapObj")
        ? <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{JSON.stringify(data, null, 2)}</pre>
        : <></>}
    </>
  );
};

export default Page;
