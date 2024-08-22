import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const Pillar = forwardRef(({ position, userImage }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                right: `${position}px`,
                bottom: '0px',
                width: '35px',
                height: '50px',
                backgroundColor: 'red',
                backgroundImage: `url(${userImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        ></div>
    );
});
