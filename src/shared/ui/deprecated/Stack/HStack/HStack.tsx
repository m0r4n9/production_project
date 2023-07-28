import {Flex, FlexProps} from "../Flex/Flex";

type HStackProps = Omit<FlexProps, 'direction'>;

/**
 * @deprecated
 */
export const HStack = (props: HStackProps) => {
    const {} = props;

    return (
        <Flex
            direction='row'
            {...props}
        >
            {props.children}
        </Flex>
    );
};
