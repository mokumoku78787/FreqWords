import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoChevronUp, GoChevronDown } from "react-icons/go";

interface OptionType {
  value: number | string,
  label: string
}

interface OptionProps {
  option: OptionType,
  selected: boolean,
  onOptionClick: Function,
}

interface SelectProps {
  title: string,
  value: number | string,
  options: OptionType[],
  onChange: Function,
  zIndex: number,
}

const getOptionByValue = (value: number | string, options: OptionType[]): OptionType => {
  const filteredOptions: OptionType[] = options.filter((option) => {
    return option.value === value;
  });
  return filteredOptions.length === 0 ? options[0] : filteredOptions[0];
}

const optionStyle = {
  background: '#111',
  color: 'white',
  padding: '8px',
  width: '250px',
  fontSize: '20px',
  cursor: 'pointer'
};

const Option = (props: OptionProps) => {
  const [hover, setHover] = useState(false);
  const toggleHover = () => { setHover(!hover); }
  const { onOptionClick, option, selected } = props;
  const styles = {
    root: {
      ...optionStyle,
      width: '250px',
      background: selected || hover ? '#333' : '#111',
      borderTop: '1px solid #111',
    },
    label: {
      cursor: 'inherit'
    }
  };
  return (
    <div
      style={styles.root}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      onClick={() => onOptionClick(option.value)}
    >
      <p style={styles.label}>{option.label}</p>
    </div>
  )
}

const Select = (props: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  }, []);
  const clickListener = useCallback(
    (e: MouseEvent) => {
      const current = (ref.current! as any);
      const node = (e.target! as any);
      if (!current.contains(node)) {
        setOpen(false);
      }
    },
    [],
  );

  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener('click', clickListener)
    document.addEventListener('keyup', escapeListener)
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener('click', clickListener)
      document.removeEventListener('keyup', escapeListener)
    }
  }, [clickListener, escapeListener]);

  const toggleOpen = () => { setOpen(!open) };

  const styles = {
    root: {
      width: '250px',
      margin: '24px'
    },
    title: {
      paddingLeft: '8px',
      fontSize: '16px',
      color: '#ddd'
    },
    selectedOptionWrapper: {
      ...optionStyle,
      display: 'flex',
      justifyContent: 'space-between' as const,
      borderBottom: open ? '0px solid black' : '1px solid white'
    },
    optionsWrapper: {
      position: 'fixed' as const,
      zIndex: props.zIndex
    }
  }
  const { title, value, options, onChange } = props;
  const titleDom = <div><p style={styles.title}>{title}</p></div>
  const selectedOption = getOptionByValue(value, options);
  const selectedDom = (
    <div
      style={styles.selectedOptionWrapper}
      onClick={toggleOpen}
    >
      <p>{selectedOption.label}</p>
      {open ? <GoChevronDown /> : <GoChevronUp style={{ pointerEvents: 'none' }} />}
    </div>
  )
  const _optionsDom = options.map((option) => {
    return (
      <Option
        key={'option-key-' + option.value}
        option={option}
        selected={option.value === value}
        onOptionClick={(value: number | string) => { onChange(value); toggleOpen() }}
      />
    )
  });
  const optionsDom = <div style={styles.optionsWrapper}>{_optionsDom}</div>;

  return (
    <div style={styles.root} ref={ref}>
      {titleDom}
      {selectedDom}
      {open ? optionsDom : null}
    </div>
  )
}

export default Select;