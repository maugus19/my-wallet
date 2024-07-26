'use client';

import { Suspense, useEffect, useState } from "react";

type minus = {
  date: string,
  location: string,
  addres: string
}
type Resp = {
  code: number,
  arrival?: minus,
  reception?: minus,
  destination?: minus,
  shipping?: minus,
  delivery?: minus,
  address: string,
}
export default function Tracker() {
  const [data, setData] = useState<Resp>();

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    const result = await getData();

    setData(result);
  }

  return (
    <Suspense>
      {
        data &&
        <div>
          status code: {data.code}  Address: {data.address}
          <br /> 
          reception: {data.reception?.location} {data.reception?.date}
          <br />
          shipping: {data.shipping?.location} {data.shipping?.date}
          <br />
          arrival: {data.arrival?.location} {data.arrival?.date}
          <br />
          destination: {data.destination?.location} {data.destination?.date}
          <br />
          delivery: {data.delivery?.location} {data.delivery?.date}
        </div>
      }

    </Suspense>
  );
}

async function getData() {

  const result = await fetch('/api/free',
    {
      method: 'GET',
      mode: 'cors'
    });

  return await result.json().then(json => {
    return json;
  });
}