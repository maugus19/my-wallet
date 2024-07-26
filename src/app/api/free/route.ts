import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const result = await triggerCallBack();
  console.log(result);
  return NextResponse.json(result);
}

async function triggerCallBack() {

  const response = await fetch("https://tsag.transclicksolutions.com/uaa/client",
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': `Basic d2lkZ2V0X2VsX2RvcmFkbzp0Y3NfdzFkZzN0XzNsX2QwcjRkMA==`,
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: 'client_id=widget_el_dorado&grant_type=client_credentials&username=&password='
    });

  const creds = await response.json().then(json => {
    return json;
  });

  const status = await fetch("https://tsag.transclicksolutions.com/sl/api/v1/tracking?enterpriseId=103&guide=aq-88021",
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${creds.access_token}`
      }
    });

  return await status.json().then(json => {
    return json;
  });
}