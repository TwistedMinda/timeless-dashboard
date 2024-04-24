import React, { useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import ProductOne from '../../images/product/product-01.png';
import ProductTwo from '../../images/product/product-02.png';
import ProductThree from '../../images/product/product-03.png';
import ProductFour from '../../images/product/product-04.png';
import { useMutation, useQuery } from 'react-query';
import Loader from '../../common/Loader';
import { createOutfit, getOutfits } from '../../firebase';
import { Link } from 'react-router-dom';

const outfitsQuery = async () => {
  const res = await getOutfits()
  return res as Ambiance[]
}

const saveOutfit = async (ambiance: Ambiance) => {
  await createOutfit(ambiance)
}

interface Ambiance {
  name: string
  image?: string
  season: string
  weather: string
}

const DefaultInput = ({
  value,
  title,
  onChange
}: {
  title: string
  value: string
  onChange?: (text: string) => void
}) => {
  return (
    <div className='mt-4'>
      <label className="mb-3 block text-black dark:text-white">
        {title}
      </label>
      <input
        value={value}
        type="text"
        placeholder=""
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
  )
}

const initialState = {
  name: '',
  season: '',
  weather: '',
}

const CreateOutfitContent = () => {
  const { data = [], isLoading } = useQuery('outfits', outfitsQuery)

  const [info, setInfo] = useState<Ambiance>(initialState)

  const onFinish = async () => {
    await saveOutfit(info)
    console.log('success', info)
    setInfo(initialState)
  }

  const onChange = (key: string, value: string) => {
    setInfo({ ...info, [key]: value })
  }

  return isLoading ? (
    <Loader /> 
  ) : (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between items-center py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Create outfit
        </h4>

        <Link
          to="/create"
          className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          onClick={onFinish}
        >
          Finish
        </Link>
      </div>

      <div className='px-6 pb-6'>
        <DefaultInput title='Name' value={info.name} onChange={(val) => onChange('name', val)} />
        <DefaultInput title='Season' value={info.season}  onChange={(val) => onChange('season', val)} />
        <DefaultInput title='Weather' value={info.weather} onChange={(val) => onChange('weather', val)} />
      </div>
    </div>
  )
}

export const CreateOutfit: React.FC = () => {
  return (
    <DefaultLayout>
      <CreateOutfitContent />
    </DefaultLayout>
  );
};
