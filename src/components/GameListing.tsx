interface GameListingProps {
    name: string;
    cardStream: string;
    onClick: () => void;
}

export function GameListing(props: GameListingProps)
{
    function ChangeGame()
    {
        console.log("Changed to: " + props.name)
        //TODO: use something to manage game switching i.e Redux, useContext etc
    }

    return (
        <li style={{listStyleType: "none", cursor: "pointer"}} onClick={props.onClick}>
            <img src={"data:image/jpg;base64," + props.cardStream} style={{width: "100%", height: "auto"}} />
        </li>
    )
}