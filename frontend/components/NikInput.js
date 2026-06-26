import React from 'react';

const NikInput = () => {
    const [nik, setNik] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);
    const [counter, setCounter] = React.useState(0);

    const handleInput = (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
        setNik(e.target.value);
        checkValidity();
    };

    const checkValidity = () => {
        if (nik.length < 16) {
            setIsValid(false);
            document.querySelector('.border').style.border = '1px solid red';
        } else {
            setIsValid(true);
            document.querySelector('.border').style.border = '1px solid green';
        }
        setCounter(nik.length);
    };

    React.useEffect(() => {
        checkValidity();
    }, [nik]);

    return (
        <div>
            <input
                type="text"
                value={nik}
                onChange={handleInput}
                placeholder="NIK"
            />
            <span className="counter">{counter}/16</span>
            <div className="border"></div>
        </div>
    );
};

export default NikInput;