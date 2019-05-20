import React from 'react';
import ReactDOM from 'react-dom';
import { CItem } from './CItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
    ReactDOM.render(<CItem id={'1'} image={'https://is4-ssl.mzstatic.com/image/thumb/Purple113/v4/88/dc/85/88dc8572-8537-ffcf-8e6a-9fd33cf78d54/AppIcon-0-1x_U007emarketing-0-85-220-9.png/53x53bb-85.png'}
        name={'Rok'} type={'Game'} app_id={'1459074261'}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});