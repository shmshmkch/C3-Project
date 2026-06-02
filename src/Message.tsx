type MessageProps = {
    text: string,
}
function Message({ text }: MessageProps) {
    return (
        <div>
            <p>{text}</p>
        </div>
    );
}

export default Message;