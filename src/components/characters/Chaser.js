import {forwardRef} from "react";

const JUMP_HEIGHT_PX = 200;
const JUMP_AIRTIME_S = 0.3;
// eslint-disable-next-line react/display-name
export const Chaser = forwardRef(({ jumpClicked, height, width, userImage }, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                bottom: jumpClicked ? `${JUMP_HEIGHT_PX}px` : '0px', // 100px is the jump height
                left: '15%', // Center horizontally
                transform: 'translateX(-50%)', // Adjust for perfect centering
                width: `${width}px`,
                height: `${height}px`,
                borderRadius: '50%',
                backgroundColor: 'blue',
                transition: `bottom ${JUMP_AIRTIME_S}s ease 300ms`,
                backgroundImage: `url("sainsbury.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        ></div>
    );
})
