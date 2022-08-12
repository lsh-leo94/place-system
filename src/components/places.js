import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Select, Typography, Input } from "antd";
import { fetchPlaces } from '../reducers/placesSlice';
import '../assets/style/place.css';
import { displayPlaceLabel } from '../helper/helper';

const INIT_FILTER_OPTION = 'address';
const { Text } = Typography;
const Places = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [filterBy, setFilterBy] = useState(INIT_FILTER_OPTION);
  const placesRedu = useSelector((state) => state.places)
  const dispatch = useDispatch();

  const autoComplete = (value) => {
    if(value.length > 0){
      dispatch(fetchPlaces({value, filterBy}))
    }
  }

  useEffect(() => {
    if(placesRedu?.places){
      setPlaces(placesRedu?.places)
    }
  }, [placesRedu])
  
  useEffect(() => {
    if(filterBy){
      setPlaces([]);
    }
  }, [filterBy])
  
  const handleSelect = (value) => {
    setSelectedPlace(places[value]);
  }

  return (
    <div>
      <Row className="form-row">
        <Col span={6}>
          <Select 
            onChange={v => setFilterBy(v)}
            optionLabelProp={'label'}
            defaultValue={INIT_FILTER_OPTION}
            className={'select-filterby'}          
          >
            <Select.Option value={'address'} label={'Address'} key={'address'}>Address</Select.Option>
            <Select.Option value={'state'} label={'State'} key={'state'}>State</Select.Option>
            <Select.Option value={'country'} label={'Country'} key={'country'}>Country</Select.Option>
          </Select>
          <Select
            showSearch={true}
            onSearch={v => {
              autoComplete(v);
            }}
            onSelect={(val) => handleSelect(val)}
            optionLabelProp={'label'}
            optionFilterProp={'label'}
            filterOption={false}
            notFoundContent={'No record found.'}
            value={displayPlaceLabel([selectedPlace?.address,selectedPlace?.state,selectedPlace?.country])}
            loading={placesRedu?.loading ?? false }
            className='filter-input'
          >
            {places.map((p,i) => {
              const placeLabel = displayPlaceLabel([p.address, p.state, p.country]);

              return (
                <Select.Option key={p?.id} label={placeLabel} value={i}>{placeLabel}</Select.Option>
              )
            })}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={14}>
          <Row gutter={12} className="form-row">
            <Col span={11}>
              <Text>Country</Text>
              <Input value={selectedPlace?.country}/>
            </Col>
            <Col span={11}>
              <Text>State</Text>
              <Input value={selectedPlace?.state}/>
            </Col>
          </Row>
          <Row gutter={12} className="form-row">
            <Col span={11}>
              <Text>City</Text>
              <Input value={selectedPlace?.city}/>
            </Col>
            <Col span={11}>
              <Text>Postal Code</Text>
              <Input value={selectedPlace?.postal_code}/>
            </Col>
          </Row>
          <Row gutter={12} className="form-row">
            <Col span={11}>
              <Text>Address</Text>
              <Input value={selectedPlace?.address}/>
            </Col>
            <Col span={11}>
              <Text>Timezone</Text>
              <Input value={selectedPlace?.timezone}/>
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <iframe title="Map for Place" loading="lazy" width="600" height="500" id="place_map" src={`https://maps.google.com/maps?q=${selectedPlace?.country}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </Col>
      </Row>
    </div>
  )
}

export default Places;