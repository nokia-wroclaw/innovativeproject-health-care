def trend_matrix(new, old):
    """Calculates trend matrix for a given two tribe results.

    Teams and questions do not have to be the same in both results.
    Resulting matrix will have the same rows and columns as the new result one.
    Teams and questions present in the new result but not in the old one
    will appear `None` values in trend matrix.
    Teams and questions present in the old result but not in the old one
    will be ignored.

    :param list new: New results.
    :param list old: Old results.
    :return: Matrix of trends.
    :rtype: list
    """

    n_matrix = new['matrix']
    t_matrix = [[None] * len(n_matrix[0]) for e in n_matrix]

    if old is None:
        return t_matrix
    o_matrix = old['matrix']

    # Map newer matrix rows to team ids and columns to questions ids
    n_t_map = {i: t['id'] for (i, t) in enumerate(new['teams'])}
    n_q_map = {i: q['id'] for (i, q) in enumerate(new['questions'])}
    # Map team and questions ids to older matrix rows and columns
    o_t_map = {t['id']: i for (i, t) in enumerate(old['teams'])}
    o_q_map = {q['id']: i for (i, q) in enumerate(old['questions'])}

    # Translate coordinates from new matrix to coordinates in the old matrix
    # and return value they point to
    def translate(i, j):
        t = n_t_map[i]
        q = n_q_map[j]
        o_i = o_t_map[t] if t in o_t_map else None
        o_j = o_q_map[q] if q in o_q_map else None
        if o_i is None or o_j is None:
            return None
        else:
            return o_matrix[o_i][o_j]

    # Iterate through entire new matrix and compare each element with its
    # analogous in the old one if it exists
    for i in range(len(n_matrix)):
        for j in range(len(n_matrix[i])):
            new_val = n_matrix[i][j]
            old_val = translate(i, j)

            trend = None
            if old_val is None:
                trend = None
            elif new_val > old_val:
                trend = 1
            elif new_val == old_val:
                trend = 0
            elif new_val < old_val:
                trend = -1

            t_matrix[i][j] = trend

    return t_matrix
