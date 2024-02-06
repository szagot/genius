$(()=>{
    const $board = $('#genius');
    const board = [
        $board.find('li').eq(0),
        $board.find('li').eq(1),
        $board.find('li').eq(2),
        $board.find('li').eq(3),
    ];

    board.forEach(($li, i) => {
        $li.on('click', () => {
            // TODO: teste
            alert(`Click em ${i}`);
        });
    });
});