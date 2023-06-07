import { useTranslation } from 'next-i18next';
import Logo from '../ui/logo';
import { TownNames } from '@/types';
import Button from '@/components/ui/button';
import { useModalAction } from '@/components/ui/modal/modal.context';
import SelectBox from '@/components/ui/forms/select-box';
import { useState } from 'react';
// import Input from "../ui/forms/input";
import Input from '@/components/ui/forms/input';
const AreaSelectModal = () => {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();
  const [userArea, setUserArea] = useState('');
  const [userStreet, setUserStreet] = useState('');
  const [areaError, setAreaError] = useState('');
  const [streetError, setStreetError] = useState('');
  const handleAreaSelect = () => {
    if (userArea.length && userStreet.length) {
      localStorage.setItem(
        'user_area',
        JSON.stringify({ town: userArea, street: userStreet })
      );
      closeModal();
    } else {
      if (userArea.length <= 0) {
        setAreaError('Select area from dropdown');
      }
      if (userStreet.length <= 0) {
        setStreetError('Enter street number');
      }
    }
  };
  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="mt-4 mb-8 text-center text-sm text-body sm:mt-5 sm:mb-10 md:text-base">
        {t('town-select-helper')}
      </p>

      {/* <select className="rounded border-gray-300">
    {
        TownTypes.map((town,index)=><option value={town} key={index}>{town}</option>)
    }
 </select> */}
      <SelectBox
        label={t('text-town')}
        // {...register('address.town')}
        name="visitor_town"
        error={areaError}
        variant="outline"
        // className="w-full"
        options={TownNames}
        value={userArea}
        onChange={(event) => {
          setUserArea(event.target.value);
        }}
      />
      <Input
        name="visitor_street"
        variant="outline"
        value={userStreet}
        onChange={(event) => {
          setUserStreet(event.target.value);
        }}
        error={streetError}
        label="Street Address"
        style={{marginTop:'5px'}}
      />
      <div className="mt-8">
        <Button onClick={handleAreaSelect} className="h-11 w-full sm:h-12">
          {t('text-submit')}
        </Button>
      </div>
    </div>
  );
};

export default AreaSelectModal;
