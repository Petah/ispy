declare namespace angular {
}

interface MouseMoveOriginalEvent extends MouseEvent {
    touches: {
        clientX: number,
        clientY: number,
    }[]
}

interface MouseMoveEvent extends JQuery.MouseMoveEvent {
    // type: 'mousemove' | 'touchmove',
    originalEvent: MouseMoveOriginalEvent
}
