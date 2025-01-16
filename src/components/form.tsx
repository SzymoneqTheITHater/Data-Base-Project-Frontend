import { DialogRoot, DialogBackdrop, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogActionTrigger, Button, DialogCloseTrigger, createListCollection, Fieldset, Input, NumberInput, SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger } from "@chakra-ui/react";
import { Field } from "./ui/field";
import React from "react";

interface IProps {
    open: boolean,
    onConfirm(): any,
}

export default function Form(props: IProps) {
    const shippingNames: string[] = ['DHL', 'Inpost', 'Polish Post', 'Self service'];
    const paymentNames: string[] = ['BLIK', 'Cash', 'Check', 'Online transfer'];
    const shippingOptions = createListCollection({ items: shippingNames });
    const paymentOptions = createListCollection({ items: paymentNames });

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
                            <Field label="Your name">
                                <Input variant={'subtle'} />
                            </Field>
                            <Field label="Your adress">
                                <Input variant={'subtle'} />
                            </Field>
                            <SelectRoot collection={shippingOptions} variant={'subtle'}>
                                <SelectLabel>Shipping method</SelectLabel>
                                <SelectTrigger></SelectTrigger>
                                <SelectContent>
                                    {shippingOptions.items.map((option, i) => (
                                        <SelectItem item={option} key={i}>{option}</SelectItem>
                                    ))}
                                </SelectContent>
                            </SelectRoot>
                            <SelectRoot collection={paymentOptions} variant={'subtle'}>
                                <SelectLabel>Payment method</SelectLabel>
                                <SelectTrigger/>
                                <SelectContent>
                                    {paymentOptions.items.map((option, i) => (
                                        <SelectItem item={option} key={i}>{option}</SelectItem>
                                    ))}
                                </SelectContent>
                            </SelectRoot>
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