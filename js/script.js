$(()=>{
    const $board = $('#genius');
    const board = [
        $board.find('li').eq(0),
        $board.find('li').eq(1),
        $board.find('li').eq(2),
        $board.find('li').eq(3),
    ];
    let optionClicked = null;
    let allowClick = false;

    // Adiciona ação de click nos itens
    board.forEach(($li, i) => {
        $li.on('click', () => {
            optionClicked = allowClick ? i : null;
            // TODO: executar ação
        });
    });
});