import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './DashboardMatchDetail_Tab.css'
import { MdSportsCricket } from "react-icons/md";
import { IoIosTennisball } from "react-icons/io";
import { BiFootball } from "react-icons/bi";
import { IoIosBasketball } from "react-icons/io";
import { FaVolleyballBall } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
import { GiHockey } from "react-icons/gi";
import DetailsTable from '../DetailsTable/DetailsTable';




function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs className='tbUppermc' value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab className='tbdtlmc' label={<span className='gameTitle'><MdSportsCricket className='gameIcn'/>InPlay</span>} {...a11yProps(0)} />
          <Tab className='tbdtlmc' label={<span className='gameTitle'><BiFootball className='gameIcn'/>Football</span>} {...a11yProps(1)} />
          <Tab className='tbdtlmc' label={<span className='gameTitle'><IoIosTennisball className='gameIcn'/>Tennis</span>} {...a11yProps(2)} />
          <Tab className='tbdtlmc' label={<span className='gameTitle'><><i class="d-icon icon-10"></i></>Horse racing</span>} {...a11yProps(3)} />
          <Tab className='tbdtlmc' label={<span className='gameTitle'><IoIosTennisball className='gameIcn'/>Cricket</span>} {...a11yProps(4)} />
          <Tab className='tbdtlmc' label={<span className='gameTitle'><IoIosBasketball className='gameIcn'/>Basketball</span>} {...a11yProps(5)} />
          <Tab className='tbdtlmc' label={<span className='gameTitle'><FaVolleyballBall className='gameIcn'/>Volleyball</span>} {...a11yProps(6)} />
          <Tab className='tbdtlmc' label={<span className='gameTitle'><IoLogoGameControllerB className='gameIcn'/>E Game</span>} {...a11yProps(7)} />
          <Tab className='tbdtlmc' label={<span className='gameTitle'><GiHockey className='gameIcn'/>Ice Hocky</span>} {...a11yProps(8)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} className="p-0">
        <DetailsTable index={0}/>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
      <DetailsTable index={1}/>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
      <DetailsTable index={2}/>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
      <DetailsTable index={3}/>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={4}>
      <DetailsTable index={4}/>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={5}>
      <DetailsTable/>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={6}>
      <DetailsTable/>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={7}>
      <DetailsTable/>
      </CustomTabPanel>
      
      <CustomTabPanel value={value} index={8}>
      <DetailsTable/>
      </CustomTabPanel>
    </Box>
  );
}