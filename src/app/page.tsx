'use client';

import React, {useState} from 'react';

import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';

import { Button } from '@nextui-org/button';
import { Card } from '@nextui-org/card';
import { Loader } from '@/components/Common/Loader/Loader';
import { DiagramCard } from '@/components/DiagramCard/DiagramCard';

export default function Home() {

  return (
    <div>
      <div className="bg-white p-4">
        <div className="flex flex-row justify-between items-center header">
          <span className="header-span">
            <h1 className="text-black">Developers Can`t Name The Things</h1>
            <span className="description">AWS visualization and helper</span>
          </span>
          <div className="flex flex-row justify-between items-center">
            {/* <div className="flex flex-row justify-between items-center border-slate-950 p-1">
              <BsSearch
                size={24}
                style={{
                  color: '#000000',
                }}
              />
              <Input type="text" />
            </div> */}
            <Link href="/diagram" className='button'>
              <Button variant="solid" color="primary" style={{height: '60px'}}>
                <GrAddCircle
                  size={18}
                />
                <span>Create New</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* <div>
        <div className="h- w-5 bg-slate-400">

        </div>
      </div> */}

          <DiagramCard>
          </DiagramCard>
        
        
      </div>
    </div>
  );
}
