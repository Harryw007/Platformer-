import { forwardRef } from "react";

const JUMP_HEIGHT_PX = 200;
const JUMP_AIRTIME_S = 0.3;

export const Character = forwardRef(({ jumpClicked, height, width, userImage }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                bottom: jumpClicked ? `${JUMP_HEIGHT_PX}px` : '0px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: `${width}px`,
                height: `${height}px`,
                borderRadius: '50%',
                backgroundColor: 'green',
                transition: `bottom ${JUMP_AIRTIME_S}s ease`,
                backgroundImage: `url(${userImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        ></div>
    );
});
