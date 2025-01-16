import { DialogRoot, DialogBackdrop, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogActionTrigger, Button, DialogCloseTrigger, createListCollection, Fieldset, Input, NumberInput, SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger } from "@chakra-ui/react";
import { Field } from "./ui/field";
import React, { JSX } from "react";

interface IProps {
    open: boolean,
    onConfirm(): any,
    children: JSX.Element[]
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
                        <Button variant="outline" color={'black'}>Cancel</Button>
                    </DialogActionTrigger>
                    <Button color={'black'} onClick={props.onConfirm}>Confirm</Button>
                </DialogFooter>
                <DialogCloseTrigger color={'black'} />
            </DialogContent>
        </DialogRoot>

    )
}