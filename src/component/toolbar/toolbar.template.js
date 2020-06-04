const toButton = button => {
  const meta = `data-type="button"
                data-value='${JSON.stringify(button.value)}'
                `;
  return `<div class="button ${button.active ? 'active' : ' '} " 
            ${meta}
          >
          <span class="material-icons"
          ${meta}
               >
              ${button.icon}
          </span>
      </div>`;
};

export const createToolbar = ({
  textAlign,
  textDecoration,
  fontStyle,
  fontWeight
}) => {
  const buttons = [
    {
      icon: 'format_align_left',
      active: textAlign === 'left',
      value: { textAlign: 'left' }
    },
    {
      icon: 'format_align_justify',
      active: textAlign === 'center',
      value: { textAlign: 'center' }
    },
    {
      icon: 'format_align_right',
      active: textAlign === 'right',
      value: { textAlign: 'right' }
    },
    {
      icon: 'format_bold',
      active: fontWeight === 'bold',
      value: { fontWeight: fontWeight === 'bold' ? 'normal' : 'bold' }
    },
    {
      icon: 'format_italic',
      active: fontStyle === 'italic',
      value: { fontStyle: fontStyle === 'italic' ? 'normal' : 'italic' }
    },
    {
      icon: 'format_underlined',
      active: textDecoration === 'underline',
      value: {
        textDecoration: textDecoration === 'underline' ? 'none' : 'underline'
      }
    }
  ];
  return buttons.map(toButton).join('');
};
