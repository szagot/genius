/**
 * Gera um número randomico
 * 
 * @param {int} start Número inicial
 * @param {int} end Número final
 * @returns Número randomico entre start e end
 */
function rand(start = 0, end = 3) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

$(() => {
    const $board = $('#genius');
    const board = [
        $board.find('li').eq(0),
        $board.find('li').eq(1),
        $board.find('li').eq(2),
        $board.find('li').eq(3),
    ];
    let optionClicked = null;
    let allowClick = false;
    let sequence = [];
    let timeSequence = 1000;
    let qtClicks = 0;

    // Ativa uma cor
    const active = (e, time = 100) => {
        e.addClass('active');
        setTimeout(() => {
            e.removeClass('active');
        }, time);
    }

    // Adiciona uma cor na sequencia
    const addSequence = () => {
        sequence.push(rand());
    };

    // Mostra a sequencia
    const showSequence = (pos = 0) => {
        qtClicks = 0;
        allowClick = false;
        active(board[sequence[pos]], timeSequence);
        setTimeout(() => {
            pos++;
            if (pos >= sequence.length) {
                allowClick = true;
            } else {
                showSequence(pos);
            }
        }, timeSequence + (timeSequence / 2));
    };

    // Adiciona uma cor e inica a sequencia
    const start = () => {
        addSequence();
        showSequence();
    }

    // Reinicia o jogo
    const restart = () => {
        sequence = [];
        qtClicks = 0;
        timeSequence = 800;
        allowClick = false;
        $board.find('li').removeClass('active');
    };

    // Verifica se a sequencia está certa ao clicar
    const validClick = () => {
        if (!allowClick) {
            return;
        }

        const positionValid = sequence[qtClicks]
        if (optionClicked === positionValid) {
            qtClicks++;
            if (qtClicks >= sequence.length) {
                allowClick = false;
                setTimeout(() => {
                    start();
                }, timeSequence);
            } else if(qtClicks % 2 == 0 && timeSequence > 250){
                timeSequence -= 50;
            }
        } else {
            restart();
            setTimeout(() => {
                $board.find('li').addClass('active');
                setTimeout(() => {
                    $board.find('li').removeClass('active');
                    start();
                }, timeSequence);
            }, timeSequence);
        }
    };

    // Adiciona ação de click nos itens
    board.forEach(($li, i) => {
        $li.on('click', () => {
            const e = board[i];

            if (allowClick) {
                optionClicked = i;
                active(e);
                validClick();
            } else {
                optionClicked = null;
                e.removeClass('active');
            }
        });
    });

    // Adiciona ações de teclado
    $(document).keydown((e) => {
        switch (e.which) {
            case 49: // Tecla do número 1 (teclado principal)
            case 97: // Tecla do número 1 (teclado numérico)
                board[0].click();
                break;
            case 50: // Tecla do número 2 (teclado principal)
            case 98: // Tecla do número 2 (teclado numérico)
                board[1].click();
                break;
            case 51: // Tecla do número 3 (teclado principal)
            case 99: // Tecla do número 3 (teclado numérico)
                board[2].click();
                break;
            case 52: // Tecla do número 4 (teclado principal)
            case 100: // Tecla do número 4 (teclado numérico)
                board[3].click();
                break;
            default:
                break;
        }
    });
    

    restart();
    start();
});