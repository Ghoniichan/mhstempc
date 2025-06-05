import CustomButton from "./CustomButton";

const SettingChangeNumber = () => {
    const handleChangedPassClick = () => {
        alert(`Mobile Number changed successfully!`);
    };

    return (
        <div className='small-setting-section'>
            <div
                className="d-flex flex-column mb-5 w-100 card shadow-sm mb-4 custom-card-setting"
                style={{ minWidth: 300, marginLeft: 'auto' }}
            >
                {/* Current Mobile Number */}
                <label htmlFor="currentMobile" className="form-label mb-4" style={{ color: '#002d62' }}>
                    Enter Current Mobile Number
                    <input
                        type="tel"
                        className="form-control mt-2"
                        id="currentMobile"
                        formNoValidate
                        pattern="[0-9]*"
                        inputMode="numeric"
                    />
                </label>

                <div className="row">
                    {/* Country Code */}
                    <div className="col-md-4">
                        <div className="form-group d-flex flex-column mb-4">
                            <label htmlFor="countryCode" style={{ color: '#002d62', whiteSpace: 'nowrap' }}>
                                Country Code
                            </label>
                            <select
                                className="form-select mt-2"
                                id="countryCode"
                                defaultValue="+63"
                            >
                                <option value="+1">+1 (USA)</option>
                                <option value="+44">+63 (PH)</option>
                            </select>
                        </div>
                    </div>

                    {/* New Mobile Number*/}
                    <div className="col-md-8">
                        <div className="form-group d-flex flex-column mb-4">
                            <label htmlFor="newMobile" style={{ color: '#002d62' }}>
                                New Mobile Number
                            </label>
                            <input
                                type="tel"
                                className="form-control mt-2"
                                id="newMobile"
                                formNoValidate
                                pattern="[0-9]*"
                                inputMode="numeric"
                            />
                        </div>
                    </div>
                </div>

                <p className="mb-4 mt-0">Your new mobile number will receive One-Time-PINs for transactions</p>

                <div className="mb-3">
                    <CustomButton label="Confirm" onClick={handleChangedPassClick} className="flex-fill" />
                </div>
            </div>
        </div>
    );
};

export default SettingChangeNumber;
