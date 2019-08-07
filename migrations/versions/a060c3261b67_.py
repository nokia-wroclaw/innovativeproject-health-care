"""Add columns answer_id, is_completed, url to actions table.
   Add foreign key answer_is for column id in table answers.
   Drop column status in actions table.

Revision ID: a060c3261b67
Revises: 26f12d3a60bd
Create Date: 2019-08-06 13:38:19.143599

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a060c3261b67'
down_revision = '26f12d3a60bd'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('actions', sa.Column('answer_id', sa.Integer(), nullable=True))
    op.add_column('actions', sa.Column('is_completed', sa.Boolean(), nullable=True))
    op.add_column('actions', sa.Column('url', sa.Text(), nullable=True))
    op.create_foreign_key(None, 'actions', 'answers', ['answer_id'], ['id'], onupdate='CASCADE', ondelete='CASCADE')
    op.drop_column('actions', 'status')


def downgrade():
    op.add_column('actions', sa.Column('status', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'actions', type_='foreignkey')
    op.drop_column('actions', 'url')
    op.drop_column('actions', 'is_completed')
    op.drop_column('actions', 'answer_id')
