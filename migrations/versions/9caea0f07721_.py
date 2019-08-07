"""Add deleted_at column to teams table

Revision ID: 9caea0f07721
Revises: a060c3261b67
Create Date: 2019-08-06 13:40:10.168801

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9caea0f07721'
down_revision = 'a060c3261b67'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('teams', sa.Column('deleted_at', sa.Date(), nullable=True))


def downgrade():
    op.drop_column('teams', 'deleted_at')
