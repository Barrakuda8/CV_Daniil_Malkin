import React from 'react';

const MiniDaniil = ({miniDaniilClick}) => {

    /*
        miniDaniilClick: function processing clicks on Mini Daniil
        return: the figure of Mini Daniil
    */

    return (
        <div className='mini_daniil' onClick={miniDaniilClick}>
            <div className='mini_daniil_body'>
                <div className='mini_daniil_head'></div>
                <div className='mini_daniil_hair'></div>
                <div className='mini_daniil_tail'></div>
                <div className='mini_daniil_left_eye'></div>
                <div className='mini_daniil_right_eye'></div>
                <div className='mini_daniil_left_eyebrow'></div>
                <div className='mini_daniil_right_eyebrow'></div>
                <div className='mini_daniil_mouth'></div>
                <div className='mini_daniil_neck'></div>
                <div className='mini_daniil_chest'></div>
                <div className='mini_daniil_left_arm'>
                    <div className='mini_daniil_left_top_arm'>
                        <div className='mini_daniil_left_bottom_arm'></div>
                        <div className='mini_daniil_left_net'></div>
                    </div>
                </div>
                <div className='mini_daniil_right_arm'>
                    <div className='mini_daniil_right_top_arm'>
                        <div className='mini_daniil_right_bottom_arm'></div>
                        <div className='mini_daniil_right_net'></div>
                    </div>
                </div>
                <div className='mini_daniil_left_sleeve'></div>
                <div className='mini_daniil_right_sleeve'></div>
                <div className='mini_daniil_trousers'></div>
                <div className='mini_daniil_belt'></div>
                <div className='mini_daniil_left_leg'>
                    <div className='mini_daniil_left_top_leg'>
                        <div className='mini_daniil_left_bottom_leg'></div>
                    </div>
                </div>
                <div className='mini_daniil_right_leg'>
                    <div className='mini_daniil_right_top_leg'>
                        <div className='mini_daniil_right_bottom_leg'></div>
                    </div>
                </div>
                <div className='mini_daniil_text_cloud mini_daniil_text_block cloud_text'></div>
                <div className='mini_daniil_text mini_daniil_text_block cloud_text'></div>
                <div className='mini_daniil_text_cloud_bottom cloud_text'></div>
            </div>
        </div>
    )
}

export default MiniDaniil;