<?php
    

    function resolver(&$sudoku){
        $row = -1;
        $column= -1;
        $is_empty = true;
        for ($i = 0; $i < 9; $i++){
            for ($j = 0; $j < 9; $j++){
                if ($sudoku[$i][$j] == 0){
                    $row = $i;
                    $column= $j;
                    $is_empty = false;
                    break;
                }
            }if(!$is_empty){
                break;
            }
        }
        if ($is_empty){
            return true;
        }   
        for ($num = 1; $num <= 9; $num++){
            if (verificar($sudoku, $row, $column, $num)){
                $sudoku[$row][$column] = $num;
                if (resolver($sudoku)){
                    return  true;
                }else{
                    $sudoku[$row][$column] = 0;
                }
            }
        }
        return false;
    }

    function verificar(&$sudoku, $row, $column, $num): bool{
        $row2 = $row - $row % intval(sqrt(sizeof($sudoku)));
        $column2 = $column- $column% intval(sqrt(sizeof($sudoku)));
        for ($i = 0; $i < 9; $i++){
            if ($sudoku[$row][$i] == $num )
                return false;
        }
        for ($i = 0; $i < 9; $i++){
            if ($sudoku[$i][$column] == $num)
                return false;
        }
        for ($i = $row2; $i < $row2 + intval(sqrt(sizeof($sudoku))); $i++){
            for ($j = $column2; $j < $column2 + intval(sqrt(sizeof($sudoku))); $j++){
                if ($sudoku[$i][$j] == $num)
                    return false;
            }
        }
        return true;
    }

    if ($_GET['json']){
        $sudoku = json_decode($_GET['json']);
        resolver($sudoku);
        echo json_encode($sudoku);
    }
?>