class Test extends React.Component {
    render() {
        return (
            <div>
                Hello
                <UIDiv test="world 2"> World </UIDiv>
            </div>
        )
    }
}

ReactDOM.render(
    <Test />,
    document.getElementById('root_abc')
);