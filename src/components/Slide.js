import * as React from 'react';
import { styled, alpha, Box } from '@mui/system';
import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';
import { User } from '../App';

let savingsValue = 25 + '%'


export default function DiscreteSlider({setProjectedSavings}) {

    

    const savingsHandler = (e) => {
        console.log(e.target.value)
        savingsValue = e.target.value + '%'
        console.log( User.income * (e.target.value * .01))
        setProjectedSavings( User.income * (e.target.value * .01))
    }


  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={25}
        step={5}
        marks
        min={10}
        max={70}
        slots={{ valueLabel: SliderValueLabel }}
        onChange={savingsHandler}
      />
    </Box>
  );
}



function SliderValueLabel() {
  return <span className="valueLabel">{savingsValue}</span>;
}


const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  300: '#66B2FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B3',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Slider = styled(BaseSlider)(
  ({ theme }) => `
  color: ${theme.palette.mode === 'light' ? blue[500] : blue[400]};
  height: 10px;
  width: 100%;
  padding: 16px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &.${sliderClasses.disabled} { 
    pointer-events: none;
    cursor: default;
    color: ${theme.palette.mode === 'light' ? grey[300] : grey[600]};
    opacity: 0.5;
  }

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: ${theme.palette.mode === 'light' ? blue[200] : blue[900]};
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    position: absolute;
    width: 16px;
    height: 16px;
    margin-left: -6px;
    margin-top: -6px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 3px solid currentColor;
    background-color: #fff;
    display: flex;
    flex-direction: column-reverse;

    &:hover{
      box-shadow: 0 0 0 4px ${alpha(
        theme.palette.mode === 'light' ? blue[200] : blue[300],
        0.3,
      )};
    }
    
    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
      outline: none;
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 5px ${alpha(
        theme.palette.mode === 'light' ? blue[200] : blue[300],
        0.5,
      )};
      outline: none;
    }

  }

  & .${sliderClasses.mark} {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 99%;
    background-color: ${theme.palette.mode === 'light' ? blue[200] : blue[900]};
    top: 43%;
    transform: translateX(-50%);
  }

  & .${sliderClasses.markActive} {
    background-color: ${theme.palette.mode === 'light' ? blue[500] : blue[400]};
  }

  & .valueLabel {
    font-family: IBM Plex Sans;
    font-weight: 600;
    font-size: 12px;
    position: relative;
    top: -1.5em;
    text-align: center;
    align-self: center;
  }
`,
);
