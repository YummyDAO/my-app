//import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
//import Divider from '@mui/material/Divider';
import {ethers, providers} from "ethers";
import { Link } from "react-router-dom";
import Home from "./home"
import './App.css';
import { Card } from '@mui/material';
import useSWR from 'swr'

const drawerWidth = 240;
const preventDefault = (event) => event.preventDefault();

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className='pd'
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

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const ariaLabel = { 'aria-label': 'description' };

const CONTRACT_ADDRESS2 = '0x2AaDaF30A804919313eA370aE8fb161BcbC94B08'; 
const contractAbi2 = [{"inputs":[{"internalType":"address","name":"_borrowerOperationsAddress","type":"address"},{"internalType":"uint256","name":"_gasCompensation","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"CCR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEBT_GAS_COMPENSATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DECIMAL_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENT_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowerOperations","outputs":[{"internalType":"contract IBorrowerOperations","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_coll","type":"uint256"},{"internalType":"uint256","name":"_debt","type":"uint256"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"computeCR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_coll","type":"uint256"},{"internalType":"uint256","name":"_debt","type":"uint256"}],"name":"computeNominalCR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"contract ITroveManager","name":"troveManager","type":"address"},{"internalType":"uint256","name":"_CR","type":"uint256"},{"internalType":"uint256","name":"_numTrials","type":"uint256"},{"internalType":"uint256","name":"_inputRandomSeed","type":"uint256"}],"name":"getApproxHint","outputs":[{"internalType":"address","name":"hintAddress","type":"address"},{"internalType":"uint256","name":"diff","type":"uint256"},{"internalType":"uint256","name":"latestRandomSeed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ITroveManager","name":"troveManager","type":"address"},{"internalType":"uint256","name":"_debtAmount","type":"uint256"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"uint256","name":"_maxIterations","type":"uint256"}],"name":"getRedemptionHints","outputs":[{"internalType":"address","name":"firstRedemptionHint","type":"address"},{"internalType":"uint256","name":"partialRedemptionHintNICR","type":"uint256"},{"internalType":"uint256","name":"truncatedDebtAmount","type":"uint256"}],"stateMutability":"view","type":"function"}]
const CONTRACT_ADDRESS3 = '0xa630d620D9a6fB70A76ebA53d1ad879D4DBD2208'; //igUSD
const contractAbi3 = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"address","name":"_stabilityPoolAddress","type":"address"},{"internalType":"address","name":"_borrowerOperationsAddress","type":"address"},{"internalType":"contract IPrismaCore","name":"prismaCore_","type":"address"},{"internalType":"address","name":"_layerZeroEndpoint","type":"address"},{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_gasPool","type":"address"},{"internalType":"uint256","name":"_gasCompensation","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"indexed":false,"internalType":"uint64","name":"_nonce","type":"uint64"},{"indexed":false,"internalType":"bytes","name":"_payload","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"_reason","type":"bytes"}],"name":"MessageFailed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"ReceiveFromChain","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"indexed":false,"internalType":"uint64","name":"_nonce","type":"uint64"},{"indexed":false,"internalType":"bytes32","name":"_payloadHash","type":"bytes32"}],"name":"RetryMessageSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"bytes","name":"_toAddress","type":"bytes"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"SendToChain","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"indexed":false,"internalType":"uint16","name":"_type","type":"uint16"},{"indexed":false,"internalType":"uint256","name":"_minDstGas","type":"uint256"}],"name":"SetMinDstGas","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"precrime","type":"address"}],"name":"SetPrecrime","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_remoteChainId","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"_path","type":"bytes"}],"name":"SetTrustedRemote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint16","name":"_remoteChainId","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"_remoteAddress","type":"bytes"}],"name":"SetTrustedRemoteAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"_useCustomAdapterParams","type":"bool"}],"name":"SetUseCustomAdapterParams","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DEBT_GAS_COMPENSATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_PAYLOAD_SIZE_LIMIT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FLASH_LOAN_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NO_EXTRA_GAS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PT_SEND","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowerOperationsAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burnWithGasCompensation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"circulatingSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"domainSeparator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_troveManager","type":"address"}],"name":"enableTroveManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"bytes","name":"_toAddress","type":"bytes"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bool","name":"_useZro","type":"bool"},{"internalType":"bytes","name":"_adapterParams","type":"bytes"}],"name":"estimateSendFee","outputs":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"zroFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"uint64","name":"","type":"uint64"}],"name":"failedMessages","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"flashFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC3156FlashBorrower","name":"receiver","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flashLoan","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"}],"name":"forceResumeReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gasPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_version","type":"uint16"},{"internalType":"uint16","name":"_chainId","type":"uint16"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"_configType","type":"uint256"}],"name":"getConfig","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_remoteChainId","type":"uint16"}],"name":"getTrustedRemoteAddress","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"}],"name":"isTrustedRemote","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lzEndpoint","outputs":[{"internalType":"contract ILayerZeroEndpoint","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"internalType":"uint64","name":"_nonce","type":"uint64"},{"internalType":"bytes","name":"_payload","type":"bytes"}],"name":"lzReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"maxFlashLoan","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"minDstGasLookup","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mintWithGasCompensation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"internalType":"uint64","name":"_nonce","type":"uint64"},{"internalType":"bytes","name":"_payload","type":"bytes"}],"name":"nonblockingLzReceive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"payloadSizeLimitLookup","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"permitTypeHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"precrime","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_srcChainId","type":"uint16"},{"internalType":"bytes","name":"_srcAddress","type":"bytes"},{"internalType":"uint64","name":"_nonce","type":"uint64"},{"internalType":"bytes","name":"_payload","type":"bytes"}],"name":"retryMessage","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_poolAddress","type":"address"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"returnFromPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"bytes","name":"_toAddress","type":"bytes"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address payable","name":"_refundAddress","type":"address"},{"internalType":"address","name":"_zroPaymentAddress","type":"address"},{"internalType":"bytes","name":"_adapterParams","type":"bytes"}],"name":"sendFrom","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"sendToSP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_version","type":"uint16"},{"internalType":"uint16","name":"_chainId","type":"uint16"},{"internalType":"uint256","name":"_configType","type":"uint256"},{"internalType":"bytes","name":"_config","type":"bytes"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"uint16","name":"_packetType","type":"uint16"},{"internalType":"uint256","name":"_minGas","type":"uint256"}],"name":"setMinDstGas","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_dstChainId","type":"uint16"},{"internalType":"uint256","name":"_size","type":"uint256"}],"name":"setPayloadSizeLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_precrime","type":"address"}],"name":"setPrecrime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_version","type":"uint16"}],"name":"setReceiveVersion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_version","type":"uint16"}],"name":"setSendVersion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_remoteChainId","type":"uint16"},{"internalType":"bytes","name":"_path","type":"bytes"}],"name":"setTrustedRemote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_remoteChainId","type":"uint16"},{"internalType":"bytes","name":"_remoteAddress","type":"bytes"}],"name":"setTrustedRemoteAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_useCustomAdapterParams","type":"bool"}],"name":"setUseCustomAdapterParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stabilityPoolAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"troveManager","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"trustedRemoteLookup","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"useCustomAdapterParams","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]
const CONTRACT_ADDRESS = '0xCAE7Cfb254fe20f5B6D08c5D2C062bCF4BFC1478';
const contractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
const fakeprice = "16400000"
const CONTRACT_ADDRESS1 = '0x738FF5c07B872704C1D86Fa4520D668e07627bE8';
const contractAbi1 = [{"inputs":[{"internalType":"address","name":"_prismaCore","type":"address"},{"internalType":"uint256","name":"_gasCompensation","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_baseRate","type":"uint256"}],"name":"BaseRateUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"CollateralSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_L_collateral","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_L_debt","type":"uint256"}],"name":"LTermsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_lastFeeOpTime","type":"uint256"}],"name":"LastFeeOpTimeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_attemptedDebtAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_actualDebtAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_collateralSent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_collateralFee","type":"uint256"}],"name":"Redemption","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_totalStakesSnapshot","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_totalCollateralSnapshot","type":"uint256"}],"name":"SystemSnapshotsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_newTotalStakes","type":"uint256"}],"name":"TotalStakesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"_newIndex","type":"uint256"}],"name":"TroveIndexUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_L_collateral","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_L_debt","type":"uint256"}],"name":"TroveSnapshotsUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_borrower","type":"address"},{"indexed":false,"internalType":"uint256","name":"_debt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_coll","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_stake","type":"uint256"},{"indexed":false,"internalType":"enum TroveManager.TroveManagerOperation","name":"_operation","type":"uint8"}],"name":"TroveUpdated","type":"event"},{"inputs":[],"name":"BOOTSTRAP_PERIOD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CCR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEBT_GAS_COMPENSATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DECIMAL_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"L_collateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"L_debt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_INTEREST_RATE_IN_BPS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MCR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENT_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRISMA_CORE","outputs":[{"internalType":"contract IPrismaCore","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SUNSETTING_INTEREST_RATE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"Troves","outputs":[{"internalType":"uint256","name":"debt","type":"uint256"},{"internalType":"uint256","name":"coll","type":"uint256"},{"internalType":"uint256","name":"stake","type":"uint256"},{"internalType":"enum TroveManager.Status","name":"status","type":"uint8"},{"internalType":"uint128","name":"arrayIndex","type":"uint128"},{"internalType":"uint256","name":"activeInterestIndex","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"accountLatestMint","outputs":[{"internalType":"uint32","name":"amount","type":"uint32"},{"internalType":"uint32","name":"week","type":"uint32"},{"internalType":"uint32","name":"day","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activeInterestIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"uint256","name":"collSurplus","type":"uint256"}],"name":"addCollateralSurplus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"}],"name":"applyPendingRewards","outputs":[{"internalType":"uint256","name":"coll","type":"uint256"},{"internalType":"uint256","name":"debt","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"baseRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowerOperationsAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowingFeeFloor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"}],"name":"claimCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"claimReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"claimableReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint256","name":"collAmount","type":"uint256"},{"internalType":"uint256","name":"debtAmount","type":"uint256"}],"name":"closeTrove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"}],"name":"closeTroveByLiquidation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"collateralToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collectInterests","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"dailyMintReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"debtToken","outputs":[{"internalType":"contract IDebtToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_debt","type":"uint256"}],"name":"decayBaseRateAndGetBorrowingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"debt","type":"uint256"},{"internalType":"uint256","name":"coll","type":"uint256"}],"name":"decreaseDebtAndSendCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"defaultedCollateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"defaultedDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emissionId","outputs":[{"internalType":"uint16","name":"debt","type":"uint16"},{"internalType":"uint16","name":"minting","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fetchPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_liquidator","type":"address"},{"internalType":"uint256","name":"_debt","type":"uint256"},{"internalType":"uint256","name":"_coll","type":"uint256"},{"internalType":"uint256","name":"_collSurplus","type":"uint256"},{"internalType":"uint256","name":"_debtGasComp","type":"uint256"},{"internalType":"uint256","name":"_collGasComp","type":"uint256"}],"name":"finalizeLiquidation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gasPoolAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_debt","type":"uint256"}],"name":"getBorrowingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_debt","type":"uint256"}],"name":"getBorrowingFeeWithDecay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBorrowingRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBorrowingRateWithDecay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"getCurrentICR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"}],"name":"getEntireDebtAndColl","outputs":[{"internalType":"uint256","name":"debt","type":"uint256"},{"internalType":"uint256","name":"coll","type":"uint256"},{"internalType":"uint256","name":"pendingDebtReward","type":"uint256"},{"internalType":"uint256","name":"pendingCollateralReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEntireSystemBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getEntireSystemColl","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEntireSystemDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"}],"name":"getNominalICR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"}],"name":"getPendingCollAndDebtRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_collateralDrawn","type":"uint256"}],"name":"getRedemptionFeeWithDecay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRedemptionRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRedemptionRateWithDecay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalActiveCollateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalActiveDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"week","type":"uint256"}],"name":"getTotalMints","outputs":[{"internalType":"uint32[7]","name":"","type":"uint32[7]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"}],"name":"getTroveCollAndDebt","outputs":[{"internalType":"uint256","name":"coll","type":"uint256"},{"internalType":"uint256","name":"debt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getTroveFromTroveOwnersArray","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTroveOwnersCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"}],"name":"getTroveStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"}],"name":"getTroveStatus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWeek","outputs":[{"internalType":"uint256","name":"week","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWeekAndDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"guardian","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"}],"name":"hasPendingRewards","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"interestPayable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"interestRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastActiveIndexUpdate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastCollateralError_Redistribution","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDebtError_Redistribution","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastFeeOperationTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdate","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidationManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxBorrowingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxRedemptionFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSystemDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minuteDecayFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_debt","type":"uint256"},{"internalType":"uint256","name":"_collateral","type":"uint256"}],"name":"movePendingTroveRewardsToActiveBalances","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_assignedIds","type":"uint256[]"}],"name":"notifyRegisteredId","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"},{"internalType":"uint256","name":"_collateralAmount","type":"uint256"},{"internalType":"uint256","name":"_compositeDebt","type":"uint256"},{"internalType":"uint256","name":"NICR","type":"uint256"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"},{"internalType":"bool","name":"_isRecoveryMode","type":"bool"}],"name":"openTrove","outputs":[{"internalType":"uint256","name":"stake","type":"uint256"},{"internalType":"uint256","name":"arrayIndex","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceFeed","outputs":[{"internalType":"contract IPriceFeed","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_debtAmount","type":"uint256"},{"internalType":"address","name":"_firstRedemptionHint","type":"address"},{"internalType":"address","name":"_upperPartialRedemptionHint","type":"address"},{"internalType":"address","name":"_lowerPartialRedemptionHint","type":"address"},{"internalType":"uint256","name":"_partialRedemptionHintNICR","type":"uint256"},{"internalType":"uint256","name":"_maxIterations","type":"uint256"},{"internalType":"uint256","name":"_maxFeePercentage","type":"uint256"}],"name":"redeemCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"redemptionFeeFloor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardIntegral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardIntegralFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardSnapshots","outputs":[{"internalType":"uint256","name":"collateral","type":"uint256"},{"internalType":"uint256","name":"debt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_priceFeedAddress","type":"address"},{"internalType":"address","name":"_sortedTrovesAddress","type":"address"},{"internalType":"address","name":"_collateralToken","type":"address"},{"internalType":"address","name":"_gasPoolAddress","type":"address"},{"internalType":"address","name":"_debtTokenAddress","type":"address"},{"internalType":"address","name":"_borrowerOperationsAddress","type":"address"},{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_liquidationManager","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minuteDecayFactor","type":"uint256"},{"internalType":"uint256","name":"_redemptionFeeFloor","type":"uint256"},{"internalType":"uint256","name":"_maxRedemptionFee","type":"uint256"},{"internalType":"uint256","name":"_borrowingFeeFloor","type":"uint256"},{"internalType":"uint256","name":"_maxBorrowingFee","type":"uint256"},{"internalType":"uint256","name":"_interestRateInBPS","type":"uint256"},{"internalType":"uint256","name":"_maxSystemDebt","type":"uint256"},{"internalType":"uint256","name":"_MCR","type":"uint256"}],"name":"setParameters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_priceFeedAddress","type":"address"}],"name":"setPriceFeed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vault","type":"address"}],"name":"setVault","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sortedTroves","outputs":[{"internalType":"contract ISortedTroves","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startSunset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sunsetting","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"surplusBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"systemDeploymentTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalCollateralSnapshot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakesSnapshot","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updateBalances","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_isRecoveryMode","type":"bool"},{"internalType":"bool","name":"_isDebtIncrease","type":"bool"},{"internalType":"uint256","name":"_debtChange","type":"uint256"},{"internalType":"uint256","name":"_netDebtChange","type":"uint256"},{"internalType":"bool","name":"_isCollIncrease","type":"bool"},{"internalType":"uint256","name":"_collChange","type":"uint256"},{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"},{"internalType":"address","name":"_borrower","type":"address"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"updateTroveFromAdjustment","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"contract IPrismaVault","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"claimant","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"vaultClaimReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
const [anchorEl, setAnchorEl] = React.useState(null);
const [currentAccount, setCurrentAccount] = React.useState('');
const [Total, setTotal] = React.useState('');
const [Balance, setBalance] = React.useState('');
const [value, setValue] = React.useState(0);
const [Coll, setColl] = React.useState('');
const [Debt, setDebt] = React.useState('');
const [Price, setPrice] = React.useState('');
const [Deposit1, setDeposit1] = React.useState('');
const [Approval, setApproval] = React.useState(''); // setfee
const [Borrowfee, setBorrowfee] = React.useState('');
const [fee, setfee] = React.useState('');

const change1 = (event) => { //deposit
    setDeposit1(event.target.value ? event.target.value : "0");
    console.log("Deposit1", Deposit1)
    Checkfee(Number(event.target.value ? event.target.value : "0"))
  };


const L = Number(Coll * fakeprice)
const U = Number(Debt * 100)
const systemratio= L / U
console.log("sys", systemratio)


const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  //connect wallet

	const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert("Get MetaMask -> https://metamask.io/");
				return;
			}

			// Fancy method to request access to account.
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		
			// Boom! This should print out public address once we authorize Metamask.
			console.log("Connected", accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error)
		}
	};

    const MintEth = async () => {
		  try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.BrowserProvider(window.ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, provider)
                console.log("mint")
	
				//let tx = await contract.mint();
				//await tx.wait();
			}
		  } catch(error) {
			console.log(error);
		  }
	};

    const ReadBalance = async () => {
        try {
          const { ethereum } = window;
          if (ethereum) {
              const provider = new ethers.BrowserProvider(window.ethereum);
              const signer = provider.getSigner();
              //const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
              const contract = new ethers.Contract(CONTRACT_ADDRESS3, contractAbi3, provider)
  
              let tx = await contract.balanceOf(currentAccount);
              //await tx.wait();
              console.log("white", ethers.formatUnits(tx, 18))
              setBalance(ethers.formatUnits(tx, 18))
          }
        } catch(error) {
          console.log(error);
        }
    };

    console.log("bal", Balance)

    const ReadTotal = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = provider.getSigner();
                //const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
                const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, provider)
    
                let tx = await contract.totalSupply();
                //await tx.wait();
                console.log("white", ethers.formatUnits(tx, 18))
                setTotal(ethers.formatUnits(tx, 18))
            }
          } catch(error) {
            console.log(error);
          }
    };

    const ReadBalance1 = async () => {
        try {
          const { ethereum } = window;
          if (ethereum) {
              const provider = new ethers.BrowserProvider(window.ethereum);
              const signer = provider.getSigner();
              //const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
              const contract = new ethers.Contract(CONTRACT_ADDRESS1, contractAbi1, provider)
  
              let tx = await contract.getEntireSystemDebt();
              //await tx.wait();
              console.log("white", ethers.formatUnits(tx, 18))
              setDebt(ethers.formatUnits(tx, 18))
              return tx;
          }
        } catch(error) {
          console.log(error);
        }
    };

    const { data, error } = useSWR('ReadBalance1', ReadBalance1)
    console.log("data", data)

    //console.log("bal", Balance)

    const ReadTotal1 = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = provider.getSigner();
                //const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
                const contract = new ethers.Contract(CONTRACT_ADDRESS1, contractAbi1, provider)
    
                let tx = await contract.getEntireSystemColl();
                //await tx.wait();
                console.log("white", ethers.formatUnits(tx, 18))
                setColl(ethers.formatUnits(tx, 18))
                return tx
            }
          } catch(error) {
            console.log(error);
          }
    };

    const Approve = async () => {
        try {
          const { ethereum } = window;
          if (ethereum) {
              const provider = new ethers.BrowserProvider(window.ethereum);
              const signer = await provider.getSigner();
              const contract = new ethers.Contract(CONTRACT_ADDRESS3, contractAbi3, signer)
              console.log("approve")
    
              let tx = await contract.approve(CONTRACT_ADDRESS1, ethers.parseUnits(Deposit1 ? Deposit1.toString() : "0", 18));
              await tx.wait();
              console.log("approvetx", tx)
          }
        } catch(error) {
          console.log(error);
        }
    };

    //gethint
    let firsthint
    let upperHint = "0x0000000000000000000000000000000000000000"
    let lowerhint = "0x0000000000000000000000000000000000000000"
    let partialNICR
    const maxFeePercentage = "1000000000000000000"

    async function CheckHint() {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = provider.getSigner();
                //const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
                const contract = new ethers.Contract(CONTRACT_ADDRESS2, contractAbi2, provider)
    
                let tx = await contract.getRedemptionHints(CONTRACT_ADDRESS1, ethers.parseUnits(Deposit1 ? Deposit1.toString() : "0", 18), fakeprice, 10);
                console.log("hint",tx)
                firsthint = tx[0]
                partialNICR = tx[1]
                //await tx.wait();
                //const tx1 = Number(tx) * 100;
                //console.log("tx1",ethers.formatUnits(tx ? tx.toString(): "0", 18)) 
                //console.log("Borrowingfee", ethers.formatUnits(tx, 18))
                //setBorrowfee(ethers.formatUnits(tx, 18))
            }
          } catch(error) {
            console.log(error);
          }
    };

    CheckHint() 

    //redeem
    const Redeem = async () => {
        try {
          const { ethereum } = window;
          if (ethereum) {
              const provider = new ethers.BrowserProvider(window.ethereum);
              const signer = await provider.getSigner();
              const contract = new ethers.Contract(CONTRACT_ADDRESS1, contractAbi1, signer)
              console.log("approve")

              CheckHint()
              console.log("firsthint", firsthint)
    
              let tx = await contract.redeemCollateral(ethers.parseUnits(Deposit1 ? Deposit1.toString() : "0", 18), firsthint, upperHint, lowerhint, partialNICR, 10, maxFeePercentage)
              await tx.wait();
              console.log("approvetx", tx)
          }
        } catch(error) {
          console.log(error);
        }
    };
    //redemptionfee
    async function CheckBorrowFee() {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = provider.getSigner();
                //const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
                const contract = new ethers.Contract(CONTRACT_ADDRESS1, contractAbi1, provider)
    
                let tx = await contract.getRedemptionRate();
                //await tx.wait();
                const tx1 = Number(tx) * 100;
                console.log("tx1",ethers.formatUnits(tx ? tx.toString(): "0", 18)) 
                console.log("Borrowingfee", ethers.formatUnits(tx, 18))
                setBorrowfee(ethers.formatUnits(tx, 18))
            }
          } catch(error) {
            console.log(error);
          }
    };
    CheckBorrowFee()
    //rdemptionfeeamount
    async function Checkfee(value) {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = provider.getSigner();
                //const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
                const contract = new ethers.Contract(CONTRACT_ADDRESS1, contractAbi1, provider)
    
                let tx = await contract.getRedemptionFeeWithDecay(ethers.parseUnits(value ? value.toString() : "0", 18));
                //await tx.wait();
                console.log("fee", ethers.formatUnits(tx ? tx.toString(): "0", 18))
                setfee(ethers.formatUnits(tx ? tx.toString(): "0", 18))
            }
          } catch(error) {
            console.log(error);
          }
    };
    //expectedcoll

    const ReadAllowance = async () => {
        try {
          const { ethereum } = window;
          if (ethereum) {
              const provider = new ethers.BrowserProvider(window.ethereum);
              const signer = provider.getSigner();
              //const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);
              const contract = new ethers.Contract(CONTRACT_ADDRESS3, contractAbi3, provider)
    
              let tx = await contract.allowance(currentAccount, CONTRACT_ADDRESS1);
              //await tx.wait();
              console.log("Approval", ethers.formatUnits(tx, 18))
              setApproval(ethers.formatUnits(tx, 18))
          }
        } catch(error) {
          console.log(error);
        }
    };

    const { data1, error1 } = useSWR('ReadTotal1', ReadTotal1, {refreshInterval: 1000})
    const { data3, error3 } = useSWR('CheckBorrowFee', CheckBorrowFee, {refreshInterval: 1000})
    const { data2, error2} = useSWR('ReadAllowance', ReadAllowance, {refreshInterval: 1000})
    const { data6, error6} = useSWR('ReadBalance', ReadBalance, {refreshInterval: 1000})
    console.log("data1", data1)

    useEffect(() => {
        ReadBalance();
        ReadTotal();
        ReadBalance1();
        ReadTotal1();
        connectWallet();
	}, [currentAccount]);

  return (
    <Box sx={{ flexGrow: 1 }} className='css-11roni71'>
      <CssBaseline />
      <AppBar position="fixed" open={open} className ='css-1cr2bp9'>
        <Toolbar>
        <div className='css-1j5lrqm'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </div>
          <Typography variant="h6" component="div" sx={{ }} className='css-3n60mj karla'>
          Iguru Finance
          </Typography>
          <div className='css-q2axfv'>
            <Button variant="contained" className='css-gkaur5'>
                <div className='css-dz5dgd'>
                    <svg width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="9" fill="none"></circle><path d="M8.89182 15.0587C8.99213 15.1604 9.00689 15.1609 9.10383 15.0629C9.48435 14.678 9.86441 14.2927 10.2445 13.9075C10.4729 13.6761 10.7012 13.4446 10.9296 13.2131H7.07227C7.67875 13.8284 8.28524 14.4436 8.89182 15.0587Z" fill="#827FF4"></path><path d="M6.02862 12.1572C6.37683 12.5102 6.7249 12.8634 7.07302 13.2165H10.9303C11.5626 12.5755 12.1952 11.9347 12.8277 11.2939H5.17578C5.46016 11.5816 5.74457 11.8692 6.02862 12.1572Z" fill="#53AEF9"></path><path d="M3.69952 9.79369C4.18992 10.2949 4.68281 10.7938 5.17583 11.2924H12.8278C13.2841 10.8302 13.7404 10.3678 14.1973 9.90609C14.3638 9.73782 14.5126 9.55911 14.6436 9.36987H3.35352C3.45634 9.51978 3.57057 9.66189 3.69952 9.79369Z" fill="#74CA38"></path><path d="M15.2954 7.44751H2.70605C2.72687 7.91091 2.82777 8.33273 3.00589 8.73977C3.10321 8.96219 3.21813 9.17306 3.35328 9.37009H14.6434C14.8661 9.04828 15.0369 8.69592 15.153 8.31179C15.238 8.0307 15.2816 7.74145 15.2954 7.44751Z" fill="#FFC866"></path><path d="M15.2995 7.31848C15.3109 6.70528 15.1793 6.12482 14.9063 5.57848C14.897 5.55982 14.8867 5.54187 14.8771 5.52344H3.12142C3.01152 5.73165 2.92026 5.95174 2.84934 6.1847C2.74374 6.53157 2.68939 6.88979 2.70199 7.21533C2.70108 7.29346 2.70257 7.37023 2.70598 7.44601H15.2953C15.2973 7.4036 15.2987 7.36108 15.2995 7.31848Z" fill="#F78F31"></path><path d="M14.0828 4.49476C13.6166 4.05579 13.0726 3.76292 12.4435 3.65329C11.8854 3.55602 11.3325 3.59407 10.7935 3.79595C10.4039 3.94186 10.0521 4.14415 9.7491 4.42689C9.52572 4.63535 9.31287 4.85508 9.0957 5.07017C9.00441 5.16058 8.99285 5.16159 8.90574 5.07341C8.75786 4.92372 8.60933 4.77464 8.46312 4.62333C7.9724 4.1155 7.3861 3.77546 6.68905 3.65239C6.095 3.5475 5.50802 3.60212 4.94567 3.82812C4.59683 3.96831 4.28292 4.16936 3.99941 4.41955C3.63491 4.74122 3.34028 5.10837 3.12109 5.52365H14.8767C14.6738 5.1355 14.403 4.79637 14.0828 4.49476Z" fill="#FC306B"></path></svg>
                </div>
                <Typography className='css-1o1o526'>{systemratio.toFixed(2)} %</Typography>
            </Button>
          </div>
          <div className='css-rntpfg'>
            <ul className='css-1hpgxmg1'>
                <div className='css-y7wezt'>
                    <Link to="/" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg'>Vaults</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt'>
                    <Link to="/earn" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg'>Earning</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt none1'>
                    <Link href="#" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg dick'>Rewards</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt none1'>
                    <Link href="#" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg dick'>Lock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt none1'>
                    <Link href="#" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg dick'>Dao</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt'>
                    <Link to="https://igurufinance.gitbook.io/iguru-finance-base/" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg1'>Docs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt'>
                    <Link to="/faucet" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg1'>faucet</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt'></div>
                <div className='css-0' aria-label="Coming soon"></div>
                <div className='css-0' aria-label="Coming soon"></div>
                <div className='css-0' aria-label="Coming soon"></div>
                <div className="hide">Coming Soon</div>
            </ul>
          </div>
          {auth && (
            <div className='flex css-w0ow2w'>
              <Typography className='ft'>
                 More
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <ExpandMoreIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link className='indi' to="/redemptions">
                    <MenuItem onClick={handleClose} className='css-u77kgq'>Redeem igUSD</MenuItem>
                </Link>
                <Link className='indi' to="https://igurufinance.gitbook.io/iguru-finance-base/">
                    <MenuItem onClick={handleClose} className='css-u77kgq'>Docs</MenuItem>
                </Link>
                <hr class="MuiDivider-root MuiDivider-fullWidth css-1fl1xyf"></hr>
                <Link className='indi' to="https://t.me/igurulsd">
                    <MenuItem onClick={handleClose} className='css-u77kgq'>Telegram</MenuItem>
                </Link>
                <Link className='indi' to="https://twitter.com/IguruLsd">
                    <MenuItem onClick={handleClose} className='css-u77kgq'>Twitter</MenuItem>
                </Link>
                <MenuItem onClick={handleClose} className='css-u77kgq none1'>Github</MenuItem>
                <hr class="MuiDivider-root MuiDivider-fullWidth css-1fl1xyf"></hr>
                <MenuItem onClick={handleClose} className='css-u77kgq none1'>
                    <div className='css-10ovolg'>
                    <Button variant="contained" className='css-zquq8g'>aik</Button>
                    <Button variant="contained" className='css-zquq8g'>aik</Button>
                    </div>
                </MenuItem>
              </Menu>
            </div>
          )}

          <div className='css-q2axfv'>
            <Button variant="contained" className='css-1nfou57'>
                <div className='css-dz5dgd'>
                <svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="14" fill="#D6E2FF"></circle><path d="M8.29321 22.8482L14.3331 19.6729H8.83782L8.29321 22.8482Z" fill="#316EFF"></path><path d="M8.83789 19.6724H14.3332L14.4837 19.5933L14.6342 19.6724H20.1295L19.5849 16.4971H9.38252L8.83789 19.6724Z" fill="#316EFF"></path><path d="M20.6742 22.8482L20.1296 19.6729H14.6343L20.6742 22.8482Z" fill="#316EFF"></path><path d="M14.4839 3.7959L12.9167 6.97124H16.051L14.4839 3.7959Z" fill="#316EFF"></path><path d="M16.051 6.97168H12.9167L11.3886 10.0679L10.844 10.147H18.1237L17.579 10.0679L16.051 6.97168Z" fill="#316EFF"></path><path d="M4.46753 11.0721L6.77455 13.3209H22.1931L24.5001 11.0721L18.1237 10.1455H10.8439L4.46753 11.0721Z" fill="#316EFF"></path><path d="M9.47552 15.9542L9.3825 16.4966H19.5848L19.4918 15.9542L22.1929 13.3213H6.77441L9.47552 15.9542Z" fill="#316EFF"></path></svg>
                </div>
                <Typography className='css-1o1o526'>0.00</Typography>
            </Button>
          </div>
          <div className='css-1v652d5'>
            <Button variant="contained" className='css-1s293qi' onClick={connectWallet}>{ currentAccount ? <p> Wallet: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </p> : <p> Connect Wallet </p> }</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        className='drawer'
      >
        <div className='css-8pxffe'>
            <div className='css-7w6khc'>
                <IconButton onClick={handleDrawerClose} className='frw'>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                <div className='css-137zasa'>
                <   Typography className='move'>Iguru Finance</Typography>
                </div>
                <div className='css-15638ad'>
            <ul className='css-1hpgxmg'>
                <div className='css-y7wezt'>
                    <Link to="/" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg1'>Vaults</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt'>
                    <Link to="/earn" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg1'>Earning</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt none1'>
                    <Link href="#" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg1'>Rewards</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt none1'>
                    <Link href="#" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg1'>Lock</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt none1'>
                    <Link href="#" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg1'>Dao</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt'>
                    <Link to="https://igurufinance.gitbook.io/iguru-finance-base/" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg1'>Docs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt'>
                    <Link to="/faucet" underline="none" color="inherit">
                        <div className='css-4e4gs8'>
                            <div className='css-0'>
                                <div className='MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-eh8hwi'>
                                    <div className='css-bhts7s'>
                                        <span className='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-1dh5icg1'>faucet</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='css-y7wezt'></div>
                <div className='css-0' aria-label="Coming soon"></div>
                <div className='css-0' aria-label="Coming soon"></div>
                <div className='css-0' aria-label="Coming soon"></div>
            </ul>
            </div>
            </div>
            <div className='css-15638ad1'>
                <div className='css-wreb46'>
                <Button variant="contained" className='css-gkaur5'>
                    <div className='css-dz5dgd'>
                        <svg width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="9" fill="none"></circle><path d="M8.89182 15.0587C8.99213 15.1604 9.00689 15.1609 9.10383 15.0629C9.48435 14.678 9.86441 14.2927 10.2445 13.9075C10.4729 13.6761 10.7012 13.4446 10.9296 13.2131H7.07227C7.67875 13.8284 8.28524 14.4436 8.89182 15.0587Z" fill="#827FF4"></path><path d="M6.02862 12.1572C6.37683 12.5102 6.7249 12.8634 7.07302 13.2165H10.9303C11.5626 12.5755 12.1952 11.9347 12.8277 11.2939H5.17578C5.46016 11.5816 5.74457 11.8692 6.02862 12.1572Z" fill="#53AEF9"></path><path d="M3.69952 9.79369C4.18992 10.2949 4.68281 10.7938 5.17583 11.2924H12.8278C13.2841 10.8302 13.7404 10.3678 14.1973 9.90609C14.3638 9.73782 14.5126 9.55911 14.6436 9.36987H3.35352C3.45634 9.51978 3.57057 9.66189 3.69952 9.79369Z" fill="#74CA38"></path><path d="M15.2954 7.44751H2.70605C2.72687 7.91091 2.82777 8.33273 3.00589 8.73977C3.10321 8.96219 3.21813 9.17306 3.35328 9.37009H14.6434C14.8661 9.04828 15.0369 8.69592 15.153 8.31179C15.238 8.0307 15.2816 7.74145 15.2954 7.44751Z" fill="#FFC866"></path><path d="M15.2995 7.31848C15.3109 6.70528 15.1793 6.12482 14.9063 5.57848C14.897 5.55982 14.8867 5.54187 14.8771 5.52344H3.12142C3.01152 5.73165 2.92026 5.95174 2.84934 6.1847C2.74374 6.53157 2.68939 6.88979 2.70199 7.21533C2.70108 7.29346 2.70257 7.37023 2.70598 7.44601H15.2953C15.2973 7.4036 15.2987 7.36108 15.2995 7.31848Z" fill="#F78F31"></path><path d="M14.0828 4.49476C13.6166 4.05579 13.0726 3.76292 12.4435 3.65329C11.8854 3.55602 11.3325 3.59407 10.7935 3.79595C10.4039 3.94186 10.0521 4.14415 9.7491 4.42689C9.52572 4.63535 9.31287 4.85508 9.0957 5.07017C9.00441 5.16058 8.99285 5.16159 8.90574 5.07341C8.75786 4.92372 8.60933 4.77464 8.46312 4.62333C7.9724 4.1155 7.3861 3.77546 6.68905 3.65239C6.095 3.5475 5.50802 3.60212 4.94567 3.82812C4.59683 3.96831 4.28292 4.16936 3.99941 4.41955C3.63491 4.74122 3.34028 5.10837 3.12109 5.52365H14.8767C14.6738 5.1355 14.403 4.79637 14.0828 4.49476Z" fill="#FC306B"></path></svg>
                    </div>
                    <Typography className='css-1o1o526'>{systemratio.toFixed(2)}</Typography>
                </Button>
                </div>
                <div className='css-wreb46'></div>
                <div className='css-wreb46'>
                <Button variant="contained" className='css-1nfou57'>
                    <div className='css-dz5dgd'>
                    <svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="14" fill="#D6E2FF"></circle><path d="M8.29321 22.8482L14.3331 19.6729H8.83782L8.29321 22.8482Z" fill="#316EFF"></path><path d="M8.83789 19.6724H14.3332L14.4837 19.5933L14.6342 19.6724H20.1295L19.5849 16.4971H9.38252L8.83789 19.6724Z" fill="#316EFF"></path><path d="M20.6742 22.8482L20.1296 19.6729H14.6343L20.6742 22.8482Z" fill="#316EFF"></path><path d="M14.4839 3.7959L12.9167 6.97124H16.051L14.4839 3.7959Z" fill="#316EFF"></path><path d="M16.051 6.97168H12.9167L11.3886 10.0679L10.844 10.147H18.1237L17.579 10.0679L16.051 6.97168Z" fill="#316EFF"></path><path d="M4.46753 11.0721L6.77455 13.3209H22.1931L24.5001 11.0721L18.1237 10.1455H10.8439L4.46753 11.0721Z" fill="#316EFF"></path><path d="M9.47552 15.9542L9.3825 16.4966H19.5848L19.4918 15.9542L22.1929 13.3213H6.77441L9.47552 15.9542Z" fill="#316EFF"></path></svg>
                    </div>
                    <Typography className='css-1o1o526'>0.00</Typography>
                </Button>
                </div>
                <div className='css-wreb46'></div>
                    <div className='css-b173wh'>
                        <Button variant="contained" className='css-1s293qi' onClick={connectWallet}>{ currentAccount ? <p> Wallet: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </p> : <p> Connect Wallet </p> }</Button>
                    </div>
            </div>
        </div>
        {/*<DrawerHeader className='ew'>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
    </DrawerHeader>*/}
      </Drawer>
      <Main open={open} className='css-142ldf2'>
        <Container maxWidth="lg" className='css-18bd6du'>
            <div className='css-v8rda8'>
                <div className='css-ji5ubp none1'>
                <Link to="/"><Button variant="contained" className='css-1te0lnf'>
                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-kjwu4b" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowRightAltIcon"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path></svg>
                        <span>Go back to Pools Selection</span>
                    </Button>
                </Link>
                </div>
                <div className='css-s3vbax'>
                    <Typography className='css-asr0bv'>
                        Redeem igUSD for a Collateral
                    </Typography>
                </div>
            </div>
            <Grid container className='css-1ddgjd7'>
                <Grid item xs={12} sm={12} md={12} lg={12} className='css-1dvm79k none1'>
                    <Card className='css-wcst0s'>
                        <Card className='css-93jgv3'>
                            <CardContent className='css-vv5l1t'>
                                <Grid container className='css-1d3bbye'>
                                    <Grid item xs={6} sm={6} md={6} lg={6} className='css-1s50f5r'>
                                        <div className='css-u4p24i'>
                                            <Typography className='css-16mmbnl'>APR</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} className='css-1s50f5r'>
                                        <div className='css-u4p24i'>
                                            <Typography className='css-16mmbnl'>Pool TVL</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider className='css-1fl1xyf'></Divider>
                            <CardContent className='css-ha3yzm '>
                                <Grid container className='css-1d3bbye'>
                                    <Grid item xs={6} sm={6} md={6} lg={6} className='css-1s50f5r'>
                                        <Typography className='css-127u7vo'>
                                            <Button variant="contained" className='css-wdrs4a'>
                                                <Typography className='css-d48p56'>0.00% &nbsp;(1x)</Typography>
                                            </Button>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} className='css-1s50f5r'>
                                        <Typography className='css-127u7vo'>$ 20.09m</Typography>
                                    </Grid>
                                </Grid>
                                <div className='css-1v3caum'></div>
                            </CardContent>
                        </Card>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} className='css-1dvm79k'>
                <Card className='css-wcst0s'>
                    <CardHeader title={<Typography className='css-1e2y9ep'>Redeem igUSD</Typography>} className='css-p9m3fa'></CardHeader>
                    <Typography className='css-1mvwzi1'>1 igUSD is always redeemable for $1 of collateral. </Typography>
                    <Typography className='css-1xa0cdz'>Select a collateral to redeem for:</Typography>
                    <Box className='css-8atqhb'>
                        <Tabs value={value} onChange={handleChange1} aria-label="basic tabs example" className='css-xlp6dr main-tabs'>
                            <Tab label="rETH" {...a11yProps(0)}  className='css-r86tzm'/>
                            {/*<Tab label="rETH" {...a11yProps(1)} className='css-r86tzm'/>*/}
                        </Tabs>
                        <CustomTabPanel value={value} index={0}>
                            <CardContent className='css-1q1z20c'>
                                <div className='css-1d1ry76'>
                                    <div className='css-gmkiuq'>
                                        <div className='css-1fxv11n'>
                                            <Typography className='css-1irks2t'>Redeem igUSD</Typography>
                                            <Typography className='css-126nj8n'>
                                                <span className='ft400'>Balance</span>
                                                &nbsp;
                                                <span className='ft700'>{Number(Balance).toFixed(2)}&nbsp;igUSD</span>
                                            </Typography>
                                        </div>
                                        <div className='css-lffzzs'>
                                            <TextField className='css-skinv8' label="Enter an amount" onChange={change1}/>
                                        </div>
                                    </div>
                                    { Approval < 1 ?
                                    <div className='mgt10'>
                                        <Button variant="contained" className='css-1r3fpwf' onClick={Approve}>Approve</Button>
                                    </div>
                                    :
                                    <div className='mgt10'>
                                        <Button variant="contained" className='css-1r3fpwf' onClick={Redeem}>Redeem</Button>
                                    </div>}
                                </div>
                            </CardContent>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <CardContent className='css-1q1z20c'>
                                    <div className='css-1d1ry76'>
                                        <div className='css-gmkiuq'>
                                            <div className='css-1fxv11n'>
                                                <Typography className='css-1irks2t'>Withdraw igUSD</Typography>
                                            </div>
                                            <div className='css-lffzzs'>
                                                <TextField className='css-skinv8' label="Enter an amount" />
                                            </div>
                                        </div>
                                        <div className='mgt10'>
                                            <Button variant="contained" className='css-1r3fpwf'>Withdraw</Button>
                                        </div>
                                    </div>
                                </CardContent>
                        </CustomTabPanel>
                    </Box>
                    <Divider className='css-1fl1xyf'></Divider>
                    <div className='css-1lydvjp'>
                        <div className='css-j7qwjs1'>
                            <Typography className='css-1mjjse1'>Information</Typography>
                            <div className='css-9jay18'>
                                <Typography className='css-1s8lop8'>Collateral Price</Typography>
                                <Typography className='css-731a11'>$ {Number(fakeprice / 10000)}</Typography>
                            </div>
                            <div className='css-9jay18'>
                                <Typography className='css-1s8lop8'>Redemption Fee</Typography>
                                <Typography className='css-731a11'>{Borrowfee}%</Typography>
                            </div>
                            <div className='css-9jay18'>
                                <Typography className='css-1s8lop8'>Redemption Fee Amount</Typography>
                                <Typography className='css-731a11'>{fee ? fee : "0.00"} igUSD</Typography>
                            </div>
                            <div className='css-9jay18'>
                                <Typography className='css-1s8lop8'>Expected Collateral Recieved</Typography>
                                <Typography className='css-731a11'>$ {Deposit1 - fee} of rETH</Typography>
                            </div>
                        </div>
                    </div>
                    <div className='css-93jgv3 none1'>
                        <Box className='css-16e1l0i1'>
                            <Accordion className='ne'>
                                <AccordionSummary className='css-u4p24i' expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography className='css-t2gyfh'>More info & Tips</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography className='css-1xa0cdz' >
                                        Stability Pool:
                                        <br/>
                                        <Link to="">0x</Link>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </div>
                </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} className='css-1dvm79k'></Grid>
            </Grid>
        </Container>
      </Main>
      <div className='css-x3zcoj'>
        <div className='css-xvi0lg'>
            <div className='css-1vg6agc'>
                <div className='css-1yhtxh1'>
                    <Typography className='move'>Iguru Finance</Typography>
                </div>
                <div className='css-11xl7y'>
                    <Link to="https://twitter.com/IguruLsd" color="inherit" underline="none" className='css-1ioy944' rel="noreferrer">
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.0416787 0L6.64177 8.82495L0 16H1.4948L7.30965 9.71813L12.0079 16H17.0947L10.1233 6.67867L16.3054 0H14.8106L9.45542 5.78548L5.12853 0H0.0416787ZM2.23989 1.10107H4.5768L14.8962 14.8988H12.5593L2.23989 1.10107Z" fill="#C1CFDD"></path></svg>
                    </Link>
                    <Link href="#" color="inherit" underline="none" className='css-1ioy944' rel="noreferrer">
                        <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.6031 1.42375C17.1815 0.758625 15.6615 0.275242 14.0724 0C13.8772 0.352851 13.6492 0.827443 13.492 1.20498C11.8027 0.95093 10.1289 0.95093 8.47071 1.20498C8.31354 0.827443 8.08035 0.352851 7.88344 0C6.29258 0.275242 4.77082 0.760401 3.34924 1.42727C0.481901 5.76019 -0.295387 9.98549 0.0932582 14.1508C1.99503 15.571 3.83807 16.4337 5.65001 16.9983C6.09739 16.3825 6.49639 15.728 6.84012 15.0382C6.18547 14.7895 5.55846 14.4825 4.96601 14.1261C5.12319 14.0097 5.27693 13.8879 5.42546 13.7627C9.03899 15.4528 12.9652 15.4528 16.5355 13.7627C16.6858 13.8879 16.8395 14.0097 16.995 14.1261C16.4008 14.4842 15.7721 14.7912 15.1174 15.04C15.4611 15.728 15.8584 16.3843 16.3075 17C18.1212 16.4355 19.966 15.5728 21.8677 14.1508C22.3237 9.32214 21.0887 5.13565 18.6031 1.42375ZM7.33241 11.5892C6.24767 11.5892 5.35809 10.5765 5.35809 9.34331C5.35809 8.11012 6.22867 7.0957 7.33241 7.0957C8.43618 7.0957 9.32573 8.10835 9.30673 9.34331C9.30845 10.5765 8.43618 11.5892 7.33241 11.5892ZM14.6286 11.5892C13.5438 11.5892 12.6543 10.5765 12.6543 9.34331C12.6543 8.11012 13.5248 7.0957 14.6286 7.0957C15.7323 7.0957 16.6219 8.10835 16.6029 9.34331C16.6029 10.5765 15.7323 11.5892 14.6286 11.5892Z" fill="#C1CFDD"></path></svg>
                    </Link>
                    <Link to="https://igurufinance.gitbook.io/iguru-finance-base/" color="inherit" underline="none" className='css-1ioy944' rel="noreferrer">
                        <svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.244 15.0062C11.3401 15.0064 11.4352 15.0254 11.524 15.0623C11.6127 15.0992 11.6933 15.1532 11.7611 15.2213C11.829 15.2893 11.8828 15.3701 11.9194 15.4589C11.9561 15.5478 11.9749 15.6429 11.9747 15.739C11.9746 15.8351 11.9555 15.9303 11.9186 16.019C11.8817 16.1077 11.8277 16.1883 11.7597 16.2562C11.6916 16.3241 11.6109 16.3778 11.522 16.4145C11.4332 16.4511 11.338 16.4699 11.2419 16.4698C11.0478 16.4695 10.8618 16.3922 10.7248 16.2547C10.5877 16.1173 10.5109 15.931 10.5112 15.737C10.5114 15.5429 10.5888 15.3569 10.7262 15.2198C10.8637 15.0828 11.0499 15.0059 11.244 15.0062ZM22.7195 10.4812C22.6234 10.4811 22.5282 10.4621 22.4395 10.4253C22.3507 10.3884 22.2701 10.3345 22.2022 10.2665C22.1343 10.1985 22.0804 10.1178 22.0437 10.029C22.007 9.94014 21.9881 9.84497 21.9882 9.74887C21.9883 9.65277 22.0073 9.55763 22.0441 9.46887C22.081 9.38011 22.1349 9.29947 22.2029 9.23157C22.2709 9.16366 22.3516 9.10982 22.4404 9.07311C22.5292 9.03639 22.6244 9.01753 22.7205 9.0176C22.9146 9.01774 23.1007 9.09497 23.2378 9.23231C23.375 9.36964 23.4519 9.55583 23.4518 9.74991C23.4517 9.944 23.3744 10.1301 23.2371 10.2672C23.0998 10.4044 22.9136 10.4813 22.7195 10.4812ZM22.7195 7.4874C22.1195 7.48795 21.5442 7.72655 21.1199 8.15083C20.6956 8.57512 20.457 9.15041 20.4564 9.75043C20.4564 9.99298 20.497 10.2345 20.5762 10.4697L13.1011 14.4493C12.8938 14.1483 12.6164 13.9023 12.2929 13.7324C11.9694 13.5625 11.6094 13.4738 11.244 13.4739C10.381 13.4739 9.59512 13.9684 9.21413 14.7397L2.49893 11.1984C1.789 10.8257 1.25811 9.65779 1.31433 8.59393C1.34347 8.0391 1.53501 7.60815 1.82752 7.4416C2.01281 7.3375 2.23557 7.34583 2.47291 7.4697L2.51663 7.49364C4.29666 8.4305 10.1198 11.4982 10.3654 11.6117C10.7433 11.7876 10.9536 11.8584 11.599 11.5523L23.6366 5.29202C23.8135 5.2254 24.0196 5.05573 24.0196 4.79861C24.0196 4.4426 23.6511 4.30207 23.6501 4.30207C22.9651 3.97417 21.9127 3.4818 20.8864 3.00088C18.692 1.97346 16.2052 0.809672 15.1132 0.237147C14.1701 -0.256266 13.4113 0.160116 13.2759 0.243392L13.0136 0.373512C8.09823 2.80414 1.51939 6.06233 1.14465 6.2903C0.475316 6.69835 0.059975 7.51134 0.00584539 8.52002C-0.077431 10.12 0.737637 11.7886 1.90455 12.3997L9.00594 16.0617C9.08417 16.5997 9.35333 17.0915 9.76425 17.4474C10.1752 17.8033 10.7004 17.9994 11.244 18C11.8377 17.999 12.4073 17.7651 12.8303 17.3485C13.2533 16.9319 13.4959 16.366 13.506 15.7724L21.3277 11.5325C21.7233 11.8428 22.2157 12.0124 22.7195 12.0124C23.3195 12.0119 23.8948 11.7733 24.3191 11.349C24.7434 10.9247 24.982 10.3494 24.9825 9.74939C24.982 9.14937 24.7434 8.57407 24.3191 8.14979C23.8948 7.72551 23.3195 7.48691 22.7195 7.48636" fill="#C1CFDD"></path></svg>
                    </Link>
                </div>
            </div>
        </div>
      </div>
      <div className=''></div>
    </Box>
  );
}