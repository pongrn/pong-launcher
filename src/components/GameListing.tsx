interface GameListingProps {
    name: string;
    cardStream: string;
}

export function GameListing(props: GameListingProps)
{
    function ChangeGame()
    {
        console.log("Changed to: " + props.name)
        //TODO: use something to manage game switching i.e Redux, useContext etc
    }

    return (
        <li style={{listStyleType: "none", cursor: "pointer"}} onClick={ChangeGame}>
            <img src={"data:image/jpg;base64," + props.cardStream} style={{width: "50vh", height: "auto"}} />
        </li>
    )
}