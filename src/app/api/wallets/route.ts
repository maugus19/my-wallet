import { getProfile } from '@/services/api/profileService';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const id = searchParams.get('id');
  const result = getProfile();

  return NextResponse.json(result);
}