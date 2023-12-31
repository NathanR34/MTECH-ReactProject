import * as React from "react";
import { styled, alpha } from "@mui/system";
import { Slider as BaseSlider, sliderClasses } from "@mui/base/Slider";
import { UserInfo } from "../App";
import { useEffect, useState, createContext, useContext } from "react";
import { blue, grey } from "@mui/material/colors";

const SavingsContext = createContext();

export const SavingsProvider = ({ children }) => {
  const [savingsValue, setSavingsValue] = useState(30);

  return (
    <SavingsContext.Provider value={{ savingsValue, setSavingsValue }}>
      {children}
    </SavingsContext.Provider>
  );
};

export const useSavings = () => {
  const context = useContext(SavingsContext);
  return context;
};

export default function DiscreteSlider({
  setProjectedSavings,
  setAvailableSpending,
  projectedSavings,
  setSavingsRatio
}) {
  const { savingsValue, setSavingsValue } = useSavings();
  let numberOfPaychecksMonthly = 2

  if(UserInfo.incomeFrequency === 'weekly'){
    numberOfPaychecksMonthly = 4
  }

    useEffect(() => {
        setProjectedSavings(UserInfo.income * (savingsValue * 0.01));
    }, [projectedSavings, setProjectedSavings, savingsValue]);
    useEffect(() => {
      setAvailableSpending( (UserInfo.income - projectedSavings) * numberOfPaychecksMonthly)
    }, [projectedSavings, numberOfPaychecksMonthly, setAvailableSpending]);

  const savingsHandler = (e) => {
    setSavingsValue(e.target.value);
    setSavingsRatio(e.target.value*0.01);
    setProjectedSavings(UserInfo.income * (e.target.value * 0.01));
  };
  function SliderValueLabel() {
    return <span className="valueLabel">{savingsValue}</span>;
  }


  return (
    <Slider
      className="slider"
      key={"slider"}
      aria-label="Temperature"
      value={savingsValue}
      // getAriaValue={valuetext}
      step={5}
      marks
      min={10}
      max={70}
      slots={{ valueLabel: SliderValueLabel }}
      onChange={savingsHandler}
    />
  );
}

// interface SliderValueLabelProps {
//   children: React.ReactElement;
// }

// function SliderValueLabel({ children }: SliderValueLabelProps) {
//   return <span className="valueLabel">{children}</span>;
// }
// function valuetext(value: number) {
//   return `${value}°C`;
// }

const Slider = styled(BaseSlider)(
  ({ theme }) => `
  color: ${theme.palette.mode === "light" ? blue[500] : blue[400]};
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
    color: ${theme.palette.mode === "light" ? grey[300] : grey[600]};
    opacity: 0.5;
  }

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: ${theme.palette.mode === "light" ? blue[200] : blue[900]};
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
        theme.palette.mode === "light" ? blue[200] : blue[300],
        0.3
      )};
    }
    
    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 4px ${
        theme.palette.mode === "dark" ? blue[700] : blue[200]
      };
      outline: none;
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 5px ${alpha(
        theme.palette.mode === "light" ? blue[200] : blue[300],
        0.5
      )};
      outline: none;
    }

  }

  & .${sliderClasses.mark} {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 99%;
    background-color: ${theme.palette.mode === "light" ? blue[200] : blue[900]};
    top: 43%;
    transform: translateX(-50%);
  }

  & .${sliderClasses.markActive} {
    background-color: ${theme.palette.mode === "light" ? blue[500] : blue[400]};
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
`
);
