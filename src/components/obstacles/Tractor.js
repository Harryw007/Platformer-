import {forwardRef} from "react";

// eslint-disable-next-line react/display-name
export  const Tractor = forwardRef(({ position }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                right: `${position}px`,
                bottom: '0px',
                width: '80px',
                height: '60px',
            }}
        >
            <img src="/tractor.svg" height="100%" width="100%" alt="wheat" />
        </div>
    );
});
