import type {App} from 'vue';
import {Button} from './Button';
import {Input, Layout, Row, Col, Form,InputNumber,Switch,Select,Tabs} from 'ant-design-vue';

export function registerGlobComp(app: App) {
    app.use(Input).use(Button).use(Layout);
    app.use(Row).use(Col).use(Form).use(InputNumber).use(Switch).use(Select).use(Tabs);;//vboot
}
