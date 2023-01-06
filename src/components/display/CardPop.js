import React, { useState } from 'react';
import Tooltip from 'react-png-tooltip'

export function CardPop({ card }) {

  return (
    <Tooltip>
      <img
        src={card.img}
        alt={card.name}
      />
      <br />
      <strong>Anything goes inside the tooltips!</strong>
    </Tooltip>
  )
}

/*

    <Stack direction="column" spacing={4}>
      <Tooltip
        title={false}
        PopperProps={{
          sx: {
            width: 100,
            height: 100,
            marginRight: "32px !important",
            backgroundImage: "url('https://picsum.photos/100')"
          },
        }}
        components={{Tooltip: Stack}}
      >
        <div>
          {card.name}
        </div>
      </Tooltip>
    </Stack>
img={card.img}
<div
        onMouseOver={handleOpen}
        onMouseLeave={handleClose}
    >{card.name}
        
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
      >
        <img
            alt={card.name}
            src={card.img}
        />
      </Popover>
    </div>
*/