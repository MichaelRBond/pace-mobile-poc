import { Button, Card, H5, Icon, Intent, Tag } from "@blueprintjs/core";
import { Communication } from "external-clients/pacebackend";
import * as React from "react";

interface Props {
    communication: Communication;
    onDelete?: () => void;
    getRSVP?: () => void;
    rsvpCount?: number;
}

export const EventCard = ({ communication, onDelete, getRSVP, rsvpCount }: Props) => (
    <Card>
        <div className={"event-title"}>
            <Icon icon={communication.event != null ? "calendar" : "clipboard"} />
            <H5>{communication.subject}</H5>
            <div className="event-title-spacer" />
            {communication.event != null && <div>
                <Tag style={{ marginRight: "1em" }} intent={Intent.NONE}>{"From: "}{
                    new Date(communication.event.start_date * 1000).toLocaleString()
                }</Tag>
                <Tag intent={Intent.NONE}>{"Until: "}{
                    new Date(communication.event.end_date * 1000).toLocaleString()
                }</Tag>
            </div>}
            <div className="event-title-spacer" />
            <Tag intent={Intent.NONE}>{new Date(communication.expiration_date * 1000).toDateString()}</Tag>
        </div>
        <p className={"formated-paragraph"}>{communication.body}</p>
        <div className={"display-spaced"}>
            <div>
                {getRSVP != null && <Button
                    icon={"user"}
                    intent={Intent.NONE}
                    onClick={getRSVP}
                >
                    {"Check RSVP"}
                </Button>}
                {rsvpCount != null && <Tag style={{marginLeft: "1em"}}intent={Intent.PRIMARY}>
                    {`${rsvpCount} RSVPs`}
                </Tag>}
            </div>
            {onDelete != null && <Button
                icon={"remove"}
                intent={Intent.DANGER}
                onClick={onDelete}
            >
                {"Delete"}
            </Button>}
        </div>
    </Card>
);
