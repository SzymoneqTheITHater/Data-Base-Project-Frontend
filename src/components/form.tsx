import { DialogRoot, DialogBackdrop, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogActionTrigger, Button, DialogCloseTrigger, Fieldset } from "@chakra-ui/react";
import React, { JSX } from "react";

interface IProps {
    open: boolean,
    onConfirm(): any,
    onClose(): any,
    children: JSX.Element[],
}

export default function Form(props: IProps) {
    return (
        <DialogRoot open={props.open}>
            <DialogBackdrop />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle color={'black'}>Form</DialogTitle>
                </DialogHeader>
                <DialogBody color={'black'}>
                    <Fieldset.Root>
                        <Fieldset.Content>
                            {props.children}
                        </Fieldset.Content>
                    </Fieldset.Root>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline" color={'black'} onClick={props.onClose}>Cancel</Button>
                    </DialogActionTrigger>
                    <Button color={'black'} onClick={props.onConfirm}>Confirm</Button>
                </DialogFooter>
                <DialogCloseTrigger color={'black'} />
            </DialogContent>
        </DialogRoot>

    )
}