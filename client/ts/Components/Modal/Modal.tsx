import * as _ from 'lodash'
import * as React from 'react'
import ReactModal from 'react-responsive-modal'
import { ComponentProps } from './ModalContainer';
import { ModalType } from '../../store/ui/models';
import BottleDetailContainer from '../Bottle/BottleDetail/BottleDetailContainer'

export class Modal extends React.Component<ComponentProps> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <ReactModal open={this.props.modal.open} onClose={this.props.closeModal} styles={{ overlay: { zIndex: 9999999 } }} center>
                {(this.props.modal.open && this.props.modal.modalType === ModalType.bottle) && <BottleDetailContainer />}
            </ReactModal>
        )
    }
}
